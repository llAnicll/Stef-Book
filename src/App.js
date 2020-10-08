import React, {useState} from 'react';
import Nav from 'components/Nav'
import Header from 'components/Header'
import About from 'components/About'
import Contact from 'components/Contact'
import Booking from 'components/Booking'
import ConfirmDialog from 'components/ConfirmDialog';
import useGAuth from 'hooks/useGAuth';

function App() {
  const [loadingItems, setLoadingItems] = useState(false);
  const {user, events} = useGAuth(setLoadingItems);
  const [dialogState, setDialogState] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // toggle the dialog state
  const toggleDialogState = item => {
    setSelectedItem(item);
    setDialogState(prevState => !prevState)
  }

  return (
    <div>
      <Nav user={user}>
        <Header/>
        <Booking user={user} events={events} toggleDialog={toggleDialogState} loadingItems={loadingItems} setLoadingItems={setLoadingItems}/>
        <About/>
        <Contact/>
      </Nav>
      {selectedItem && <ConfirmDialog open={dialogState} toggle={toggleDialogState} item={selectedItem} user={user} />}
    </div>
  );
}

export default App;
