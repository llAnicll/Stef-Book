import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import firebase from 'fbConfig';
import { TextField } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

export default function CreateNewEventDialog(props) {
  const { open, toggle } = props;
  const [message, setMessage] = useState('');
  const { handleSubmit, errors, control } = useForm();
  const [input, setInput] = useState();
  const [submiting, setSubmiting] = useState(false);

  const confirmCreation = (data, e) => {
    e.preventDefault();
    delete data.end;
    console.log('original: ', data);
    setInput(data);
    setMessage('Are you sure you want to create this event?');
  };

  // convert to proper data types
  const parseData = () => {
    var newData = input;
    for (var key in input) {
      switch (key) {
        case 'durration':
          var end = new Date(newData.start);
          end = end.setMinutes(end.getMinutes() + Number(newData.durration) * 60);
          newData['end'] = new Date(end);
          console.log(end);
          break;
        case 'maxAttendees':
          newData[key] = parseInt(newData[key], 10);
          break;
        case 'start':
          newData[key] = new Date(newData[key]);
          break;
        default:
      }
    }
    delete newData.durration;
    newData['attendees'] = [];
    newData['currentAttendees'] = 0;
    return newData;
  };

  // update the event
  const createEvent = () => {
    setSubmiting(true);
    const parsed = parseData();
    console.log('New: ', parsed);
    const eventsRef = firebase.firestore().collection('events');
    eventsRef.add(parsed).then(() => {
      setSubmiting(false);
      setMessage('Your event has been added');
    });
    toggle();
  };

  const form = (
    <form id='create-new-event' onSubmit={handleSubmit(confirmCreation)}>
      <Controller
        as={<TextField />}
        control={control}
        name='title'
        label='Event title'
        type='text'
        defaultValue=''
        fullWidth
        color='primary'
        margin='normal'
        variant='outlined'
        InputLabelProps={{ shrink: true }}
        rules={{ required: 'required' }}
        error={errors.title ? true : false}
        helperText={errors.title ? errors.title.message : ''}
      />
      <Controller
        as={<TextField />}
        control={control}
        name='start'
        label='When does it start?'
        type='datetime-local'
        defaultValue=''
        fullWidth
        color='primary'
        margin='normal'
        variant='outlined'
        InputLabelProps={{ shrink: true }}
        rules={{ required: true }}
        error={errors.start ? true : false}
        helperText={errors.start ? errors.start.message : ''}
      />
      <Controller
        as={<TextField />}
        control={control}
        name='durration'
        label='How long is it? (Hours)'
        defaultValue=''
        fullWidth
        type='number'
        color='primary'
        margin='normal'
        variant='outlined'
        InputLabelProps={{ shrink: true }}
        rules={{ required: true }}
        error={errors.durration ? true : false}
        helperText={errors.durration ? errors.durration.message : ''}
      />
      <Controller
        as={<TextField />}
        control={control}
        name='maxAttendees'
        label='How many people can join?'
        defaultValue=''
        type='number'
        fullWidth
        color='primary'
        margin='normal'
        variant='outlined'
        InputLabelProps={{ shrink: true }}
        rules={{ required: true }}
        error={errors.maxAttendees ? true : false}
        helperText={errors.maxAttendees ? errors.maxAttendees.message : ''}
      />
      <Controller
        as={<TextField />}
        control={control}
        name='location'
        label='Where does it take place? (Optional)'
        defaultValue=''
        type='text'
        fullWidth
        color='primary'
        margin='normal'
        variant='outlined'
        InputLabelProps={{ shrink: true }}
        error={errors.location ? true : false}
        helperText={errors.location ? errors.location.message : ''}
      />
    </form>
  );

  return (
    <Dialog open={open}>
      <DialogTitle style={{ cursor: 'move' }}>New Offer</DialogTitle>
      <DialogContent>{message === '' ? form : message}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={toggle}>
          Cancel
        </Button>
        {message === '' ? (
          <Button form='create-new-event' type='submit' color='secondary'>
            Create
          </Button>
        ) : (
          <Button disabled={submiting} onClick={createEvent} color='secondary'>
            Create
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
