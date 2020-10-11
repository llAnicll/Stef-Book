import React, { useState, useEffect } from 'react';
import firebase from 'fbConfig';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Container,
  Grid,
  Box,
  Typography,
  Collapse,
  IconButton,
  CircularProgress,
  Zoom,
} from '@material-ui/core';
import SessionRequestButton from 'components/booking components/SessionRequestButton';
import Event from 'components/booking components/Event';
import CreateEventButton from 'components/booking components/CreateEventButton';

const useStyles = makeStyles(theme => ({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  container: {
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(6),
    transition: '0.75s',
  },
  containerFixed: {
    height: '454px',
  },
  grid: {
    margin: 0,
    width: '100%',
  },
  gridPreview: {
    minHeight: '138px',
  },
  buttonContainer: {
    widht: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
  moreButton: {
    transform: 'rotate(0deg)',
    transition: '0.25s',
  },
  moreButtonOpen: {
    transition: '0.5s',
    transform: 'rotate(180deg)',
  },
  centerItem: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function Booking(props) {
  const classes = useStyles();
  const { user, toggleDialog, admin, toggleCreateDialog } = props;
  const [events, setEvents] = useState([]);
  const [expanded, setExpanded] = useState(false);

  // toggle more events view
  const toggleExpand = () => {
    setExpanded(prevState => !prevState);
  };

  // get the minimum date from which events should be shown
  const getMinDate = () => {
    const today = new Date();
    const date = today.getDate();
    var tomorrow = new Date().setDate(date + 1);
    tomorrow = new Date(tomorrow).setHours(0, 0, 0);
    return tomorrow;
  };

  // filter events that are full
  const filterAvailableEvents = eventsList => {
    const newList = eventsList.filter(item => {
      if (item.currentAttendees < item.maxAttendees) {
        return item;
      }
    });
    if (newList.length > 0) {
      return newList;
    } else {
      return null;
    }
  };

  // get events
  useEffect(() => {
    const nextDay = getMinDate();
    const db = firebase.firestore();
    const eventsRef = db.collection('events');
    const queary = eventsRef.where('start', '>', new Date(nextDay));
    queary.get().then(res => {
      const eventsList = res.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      const newList = filterAvailableEvents(eventsList);
      setEvents(newList);
    });
  }, []);

  const getDisplayItems = () => {
    if (events.length > 0) {
      return events.map(
        (item, index) =>
          index < 4 && (
            <Zoom key={index} in={true} timeout={parseInt(`${index + 9}00`)}>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Event item={item} onClick={toggleDialog} />
              </Grid>
            </Zoom>
          )
      );
    } else {
      return (
        <Zoom in={true} timeout={800}>
          <Grid item>
            <CircularProgress color='secondary' />
          </Grid>
        </Zoom>
      );
    }
  };

  // if no events
  if (events === null) {
    return (
      <Box className={classes.background}>
        <Container id='booking' className={classes.container}>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            spacing={3}
            className={classes.grid}
          >
            <Grid item xs={12} className={classes.centerItem}>
              <Typography variant='h2' component='h2' align='center' gutterBottom>
                Upcoming Events
              </Typography>
            </Grid>

            <Grid item xs={admin ? 6 : 12} className={classes.centerItem}>
              <SessionRequestButton user={user} />
            </Grid>

            {admin && (
              <Grid item xs={6} className={classes.centerItem}>
                <CreateEventButton toggleCreateDialog={toggleCreateDialog} />
              </Grid>
            )}

            <Grid item xs={12} className={classes.centerItem}>
              <Typography variant='h6' align='center'>
                Looks like there are no upcoming events
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box className={classes.background}>
      <Container id='booking' className={classes.container}>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={3}
          className={classes.grid}
        >
          <Grid item xs={12} className={classes.centerItem}>
            <Typography variant='h2' component='h2' align='center' gutterBottom>
              Upcoming Events
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.centerItem}>
            <SessionRequestButton user={user} />
            {admin && <CreateEventButton toggleCreateDialog={toggleCreateDialog} />}
          </Grid>

          {getDisplayItems()}
        </Grid>
        <Collapse in={expanded} timeout='auto'>
          {events.length > 4 && (
            <Grid
              container
              direction='row'
              justify='flex-start'
              alignItems='center'
              spacing={3}
              className={classes.grid}
            >
              {events.map(
                (item, index) =>
                  index >= 4 && (
                    <Grid item key={index} xs={12} sm={12} md={6} lg={3}>
                      <Event item={item} onClick={toggleDialog} />
                    </Grid>
                  )
              )}
            </Grid>
          )}
        </Collapse>
        {events.length > 4 && (
          <Zoom in={true} timeout={800}>
            <div className={classes.centerItem} style={{ width: '100%' }}>
              <IconButton onClick={toggleExpand}>
                <ExpandMoreIcon
                  className={expanded ? classes.moreButtonOpen : classes.moreButton}
                />
              </IconButton>
            </div>
          </Zoom>
        )}
      </Container>
    </Box>
  );
}
