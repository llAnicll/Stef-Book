import React from 'react';
import { Button } from '@material-ui/core';

export default function SessionRequestButton(props) {
  const { user } = props;

  // yes I know this could be better...
  const requestSession = e => {
    e.preventDefault();
    const to = 'mailto:volleyballyyc@gmail.com';
    const subject = `?subject=Volleyball%20YYC%20Private%20Session%20Request`;
    const body = `&body=From:%20${user ? user.displayName : ''}%0AEmail:%20${
      user ? user.email : ''
    }%0A%0AHi%20Stefan,%20I%20am%20looking%20to%20get%20a%20private%20session%20with%20you`;
    const url = to + subject + body;
    window.open(url, '_blank');
  };

  return (
    <Button variant='contained' color='secondary' onClick={requestSession}>
      Request a Session
    </Button>
  );
}
