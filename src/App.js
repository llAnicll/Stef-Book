import React, { useState, useEffect } from 'react';
import Nav from 'components/Nav';
import Header from 'components/Header';
import About from 'components/About';
import Contact from 'components/Contact';
import Booking from 'components/Booking';
import ConfirmDialog from 'components/ConfirmDialog';
import firebase from 'fbConfig';
import CreateNewEventDialog from 'components/NewEventDialog';

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);

  // toggle the dialog state
  const toggleDialogState = item => {
    setSelectedEvent(item);
    setConfirmDialog(prevState => !prevState);
  };

  // toggle create dialog
  const toggleCreateDialog = () => {
    setCreateDialog(prevState => !prevState);
  };

  // listen for auth state change
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  // this is how you get the admin cliem
  useEffect(() => {
    if (user !== null) {
      user.getIdTokenResult().then(idTokenResult => {
        setAdmin(idTokenResult.claims.admin);
      });
    } else {
      setAdmin(false);
    }
  }, [user]);

  return (
    <div>
      <Nav user={user}>
        <Header />
        <Booking
          user={user}
          toggleDialog={toggleDialogState}
          admin={admin}
          toggleCreateDialog={toggleCreateDialog}
        />
        <About />
        <Contact />
      </Nav>
      {selectedEvent && (
        <ConfirmDialog
          open={confirmDialog}
          user={user}
          item={selectedEvent}
          toggle={toggleDialogState}
          admin={admin}
        />
      )}
      {admin && <CreateNewEventDialog open={createDialog} toggle={toggleCreateDialog} />}
    </div>
  );
}

export default App;
