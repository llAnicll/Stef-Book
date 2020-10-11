import React from 'react';
import { Button } from '@material-ui/core';

export default function CreateEventButton(props) {
  const { toggleCreateDialog } = props;

  return (
    <Button
      variant='contained'
      color='secondary'
      onClick={toggleCreateDialog}
      style={{ marginLeft: '.5rem' }}
    >
      Create Event
    </Button>
  );
}
