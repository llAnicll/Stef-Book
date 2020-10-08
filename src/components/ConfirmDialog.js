import React, {useState, useEffect} from 'react'
import {Button, TextField} from '@material-ui/core'
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';

export default function ConfirmDialog(props) {
    const {open, toggle, item, user} = props
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [done, setDone] = useState(false);

    // sign in with google
    const authorize = async () => {
        setLoading(true);
        await window.gapi.auth2.getAuthInstance().signIn();
    }

    // end loading when we have the current user
    useEffect(() => {
        if(user) {
            setLoading(false);
            setMessage(`To be entered in ${item.summary} event/clinic, please confirm ${user.getEmail()} is your email address. You will be contacted at this email address for any updates.`)
        }
    },[user])

    // increment the number of attendees by one
    const incrementUserTotal = item => {
        let totalArr = item.description.split('/',2);
        totalArr[0] = parseInt(totalArr[0]) + 1;
        const final = `${totalArr[0]}/${totalArr[1]}`
        return final;
    }

    // make changes to the event
    const editEvent = () => {
        var eventToUpdate = item;
        // create the attendees property if undefined
        if(!eventToUpdate.hasOwnProperty('attendees')) {
            eventToUpdate.attendees = [];
        } else {
            const found = eventToUpdate.attendees.find(attendee => {
                if(attendee.email === user.getEmail()) return true;
            })
            if(found) {
                setMessage(`Looks like someone with the email ${user.getEmail()} is already part of this event. If this is not you please contact me immediately`)
                return;
            } else {
                // user is not entered, display confirmation
                setMessage(`To be entered in ${item.summary} event/clinic, please confirm ${user.getEmail()} is your email address. You will be contacted at this email address for any updates.`)
            }
        }
        // add new attendee
        eventToUpdate.attendees.push({email: user.getEmail(), name: user.getName()});
        // increase number of attendees
        eventToUpdate.description = incrementUserTotal(item);
        updateEvent(eventToUpdate);
    }

    const handleUserfinish = () => {
        setDone(false);
        toggle();
    }

    // update the event
    const updateEvent = eventToUpdate => {
        // build request
        var request = window.gapi.client.calendar.events.patch({
            calendarId: process.env.REACT_APP_CALENDAR_ID,
            eventId: eventToUpdate.id,
            resource: eventToUpdate,
            sendUpdates: 'all',
        });
        // send/execute request
        request.execute(res => {
            console.log('Updated event: ', res);
            setMessage(`${user.getName()} has been added to the event`)
            setDone(true);
        })
    }

    if(!user) {
        return (
            <Dialog open={open}>
                <DialogTitle style={{ cursor: 'move' }}>
                    Authorize Google
                </DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={toggle} disabled={loading} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={authorize} disabled={loading} color="secondary">
                        Authorize
                    </Button>
                </DialogActions>
            </Dialog>
        );
    } 

    return (
        <Dialog open={open} >
            <DialogTitle style={{ cursor: 'move' }}>
                Confirm
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message !== '' ? ( message ) : (
                        `To be entered in ${item.summary} event/clinic, please confirm ${user.getEmail()} is your email address. You will be contacted at this email address for any updates.`
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={toggle} color="secondary">
                    Cancel
                </Button>
                <Button onClick={done ? handleUserfinish : editEvent} color="secondary">
                    {done ? 'Close' : 'Confirm'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}