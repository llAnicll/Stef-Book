import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import firebase from 'fbConfig';

export default function ConfirmDialog(props) {
  const { open, toggle, item, user, admin } = props;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (deleteConfirm) {
      const eventRef = firebase.firestore().collection('events').doc(item.id);
      eventRef.delete();
      setDeleteConfirm(false);
      setMessage('');
      toggle();
    } else {
      setMessage('Are you sure you want to delete this item?');
      setDeleteConfirm(true);
    }
  };

  // end loading when we have the current user
  useEffect(() => {
    if (user) {
      setLoading(false);
      setMessage(
        `To be entered in ${item.summary} event/clinic, please confirm ${user.email} is your email address. You will be contacted at this email address for any updates.`
      );
    }
  }, [user, item.summary]);

  // make changes to the event
  const editEvent = async () => {
    var eventToUpdate = item;
    // get item again to ensure it will no be over max capacity
    const eventsRef = firebase.firestore().collection('events');
    eventsRef
      .doc(item.id)
      .get()
      .then(res => {
        eventToUpdate = { id: res.id, ...res.data() };
      });

    if (eventToUpdate.currentAttendees >= eventToUpdate.maxAttendees) {
      setMessage(
        'Dang, looks like the event just filled up, keep an eye our for future events similar to this one'
      );
      setDone(true);
      return;
    }

    // check if user is already attending
    const found = eventToUpdate.attendees.find(attendee => {
      if (attendee.toLowerCase() === user.email.toLowerCase()) return true;
      return false;
    });
    if (found) {
      setMessage(
        `Looks like someone with the email ${user.email} is already part of this event. If this is not you please contact me immediately`
      );
      setDone(true);
      return;
    } else {
      // add new attendee
      eventToUpdate.attendees.push(user.email);
      eventToUpdate.currentAttendees += 1;
      updateEvent(eventToUpdate);
    }
  };

  const handleUserfinish = () => {
    setDone(false);
    toggle();
  };

  // update the event
  const updateEvent = eventToUpdate => {
    const eventRef = firebase.firestore().collection('events').doc(eventToUpdate.id);
    eventRef
      .update({
        attendees: eventToUpdate.attendees,
        currentAttendees: eventToUpdate.currentAttendees,
      })
      .then(() => {
        setMessage(`${user.email} has been added to the event`);
        setDone(true);
      })
      .catch(err => {
        setMessage(
          'oops, looks like something went wrong, please try again later. If you are having trouble joining an event please contact directly'
        );
        setDone(true);
      });
  };

  // sign in with google
  const authorize = async () => {
    setLoading(true);
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(err => {
        setMessage(err.message);
        console.log('There was an error: ', err);
      });
  };

  if (!user) {
    return (
      <Dialog open={open}>
        <DialogTitle style={{ cursor: 'move' }}>Authorize Google</DialogTitle>
        <DialogContent>
          <DialogContentText>You need to login to be able to join clinics</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={toggle} disabled={loading} color='secondary'>
            Cancel
          </Button>
          <Button onClick={authorize} disabled={loading} color='secondary'>
            login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open}>
      <DialogTitle style={{ cursor: 'move' }}>Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message !== ''
            ? message
            : `To be entered in ${item.title} event/clinic, please confirm ${user.email} is your email address. You will be contacted at this email address for any updates.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {admin && <Button onClick={handleDelete}>{deleteConfirm ? 'yes' : 'Delete'}</Button>}
        {!deleteConfirm && (
          <>
            <Button autoFocus onClick={toggle} color='secondary'>
              Cancel
            </Button>
            <Button onClick={done ? handleUserfinish : editEvent} color='secondary'>
              {done ? 'Close' : 'Confirm'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
