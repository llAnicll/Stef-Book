import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, ButtonBase, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: '#f9f9f9', // theme.palette.primary.light
    transition: '0.5s',
    transitionTimingFunction: 'ease-in-out',
    '&:hover': {
      transform: 'translateY(-20px)',
    },
  },
  buttonBase: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    displat: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Event(props) {
  const { item, onClick } = props;
  const classes = useStyles();
  const [mouseOver, setMouseOver] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
  });

  // handle mouse over
  const handleMouseEnter = e => {
    e.preventDefault();
    setMouseOver(true);
  };

  // handle mouse leave
  const handleMouseLeave = e => {
    e.preventDefault();
    setMouseOver(false);
  };

  useEffect(() => {
    if (item) {
      const title = item.title;
      const startDate = item.start.toDate().toLocaleDateString();
      const startTime = item.start.toDate().toLocaleTimeString();
      const endTime = item.end.toDate().toLocaleTimeString();
      const location = item.location;

      setEventDetails({
        title: title,
        date: startDate,
        startTime: startTime, // remove seconds
        endTime: endTime, // Remove seconds
        location: location,
      });
    }
  }, [item]);

  return (
    <Paper elevation={mouseOver ? 12 : 4} className={classes.paper}>
      <ButtonBase
        className={classes.buttonBase}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(item)}
      >
        <Typography variant='h6' component='h6' algin='left' color='initial' gutterBottom>
          {eventDetails.title}
        </Typography>
        <Typography variant='body2'>{`Date: ${eventDetails.date}`}</Typography>
        <Typography variant='body2'>{`${eventDetails.startTime} - ${eventDetails.endTime}`}</Typography>
        <Typography variant='body2'>{`Location: ${eventDetails.location}`}</Typography>
      </ButtonBase>
    </Paper>
  );
}
