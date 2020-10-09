import React, {useState, useEffect} from 'react';
import Nav from 'components/Nav';
import Header from 'components/Header';
import About from 'components/About';
import Contact from 'components/Contact';
import Booking from 'components/Booking';
import ConfirmDialog from 'components/ConfirmDialog';
import firebase from 'fbConfig';
import CreateNewEventDialog from 'components/NewEventDialog';

function App() {
  const [user , setUser] = useState(null);
  const [dialogState, setDialogState] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createDialogState, setCreateDialogState] = useState(false);
  const [admin, setAdmin] = useState(false);
  
  // toggle the dialog state
  const toggleDialogState = item => {
    setSelectedEvent(item);
    setDialogState(prevState => !prevState)
  }
  
  // toggle create dialog
  const toggleCreateDialogState = () => {
    setCreateDialogState(prevState => !prevState);
  }

  // listen for auth state change
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  },[])

  // this is how you get the admin cliem
  useEffect(() => {
    if(user !== null) {
      user.getIdTokenResult().then(idTokenResult => {
        setAdmin(idTokenResult.claims.admin)
      })
    } else {
      setAdmin(false);
    }
  },[user])

  return (
    <div>
      <Nav user={user} admin={admin} toggleCreate={toggleCreateDialogState}>
        <Header/>
        <Booking user={user} toggleDialog={toggleDialogState} />
        <About/>
        <Contact/>
      </Nav>
      {selectedEvent && <ConfirmDialog open={dialogState} user={user} item={selectedEvent} toggle={toggleDialogState} admin={admin}/>}
      {admin && <CreateNewEventDialog open={createDialogState} toggle={toggleCreateDialogState} />}
    </div>
  );
}

export default App;
