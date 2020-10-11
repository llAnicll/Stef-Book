import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import firebase from 'fbConfig';

export default function ConfirmDialog(props) {
  const { open, toggle, item, user, admin } = props;
  const [titleMessage, setTitleMessage] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [willDelete, setWillDelete] = useState(false);

  // set the initial display text if their is a user
  useEffect(() => {
    if (user) {
      setMessage(
        `To be entered in this event, confirm: ${user.email} is your email address. You will be contacted at this email address for any updates`
      );
      setTitleMessage('Confirm');
    } else {
      setMessage('You need to be signed in to enter this event');
      setTitleMessage('Sign in required');
    }
  }, [user]);

  // handle cencel press
  const handleClose = () => {
    toggle();
  };

  // handle confirm press
  const handleConfirmButton = async () => {
    // get the latest version of the event
    setLoading(true);
    const eventRef = firebase.firestore().collection('events').doc(item.id);
    const event = await eventRef.get().then(res => res.data());
    // check if the event is full
    if (event.currentAttendees >= event.maxAttendees) {
      setMessage(
        'Looks like the event just filled up, keep an eye out for future events like this one'
      );
      setLoading(false);
      setDone(true);
      return;
    }
    // check if the user is part of the event
    if (event.attendees.includes(user.email)) {
      setMessage('Looks like you are already joined in this event');
      setLoading(false);
      setDone(true);
      return;
    }
    // update event
    event.attendees.push(user.email);
    event.currentAttendees += 1;
    // update the event
    await eventRef
      .update({
        attendees: event.attendees,
        currentAttendees: event.currentAttendees,
      })
      .then(() => {
        setMessage(`${user.email} has been added to the event`);
        setLoading(false);
        setDone(true);
      });
  };

  const handleDelete = () => {
    if (willDelete) {
      setLoading(true);
      const eventRef = firebase.firestore().collection('events').doc(item.id);
      eventRef.delete();
      setLoading(false);
      setMessage('The event has been removed, refresh page to see changes');
      setWillDelete(false);
      setDone(true);
    } else {
      setMessage('Are you sure you want to delete this item?');
      setWillDelete(true);
    }
  };

  // sign in with google
  const authorize = async () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const getDialogContent = () => {
    if (!user) {
      return (
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      );
    } else {
      return (
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      );
    }
  };

  const getDialogActions = () => {
    if (!user) {
      return (
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={authorize} color='secondary'>
            Sign in with Google
          </Button>
        </DialogActions>
      );
    } else {
      return (
        <DialogActions>
          {admin && willDelete && (
            <Button onClick={handleClose} disabled={loading}>
              cancel
            </Button>
          )}
          {admin && done === false && (
            <Button onClick={handleDelete} disabled={loading}>
              Delete
            </Button>
          )}
          {willDelete === false && (
            <>
              <Button color='secondary' onClick={handleClose} disabled={loading}>
                {done ? 'Close' : 'Cancel'}
              </Button>
              {!done && (
                <Button color='secondary' onClick={handleConfirmButton} disabled={loading}>
                  Confirm
                </Button>
              )}
            </>
          )}
        </DialogActions>
      );
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle style={{ cursor: 'move' }}>{titleMessage}</DialogTitle>
      {getDialogContent()}
      {getDialogActions()}
    </Dialog>
  );
}
