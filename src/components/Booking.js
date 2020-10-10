import React, { useState, useEffect } from 'react';
import firebase from 'fbConfig';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  ButtonBase,
  Collapse,
  IconButton,
  CircularProgress,
  Zoom,
} from '@material-ui/core';
import SessionRequestButton from 'components/booking components/SessionRequestButton';

const useStyles = makeStyles(theme => ({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  container: {
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(6),
    minHeight: '493px',
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
  paper: {
    backgroundColor: '#f9f9f9', // theme.palette.primary.light
    transition: '0.5s',
    transitionTimingFunction: 'ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
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
    transform: 'rotate(180deg)',
  },
  centerItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  itemWithDelete: {
    width: '100%',
    display: 'flex',
  },
  deleteIconButton: {
    padding: theme.spacing(1),
  },
  itemTitle: {
    justifySelf: 'flex-start',
    flexGrow: 1,
  },
}));

export default function Booking(props) {
  const { user, toggleDialog } = props;
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [mousOver, setMouseOver] = useState(null);

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

  // get the events
  useEffect(() => {
    const nextDay = getMinDate();
    const eventsRef = firebase.firestore().collection('events');
    const queary = eventsRef.where('start', '>', new Date(nextDay));
    queary.get().then(res => {
      if (res.docs.length > 0) {
        const eventsList = res.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
        setFetched(true);
      } else {
        setEvents(null);
        setFetched(true);
      }
    });
  }, []);

  useEffect(() => {
    if (fetched) {
      if (events !== null) {
        const newList = events.filter(item => {
          if (item.currentAttendees < item.maxAttendees) {
            return item;
          }
        });
        if (newList.length > 0) {
          setEvents(newList);
        } else {
          setEvents(null);
        }
      }
    }
  }, [fetched]);

  // get items that should be used per section
  const getMapableItems = (start, stopCondition) => {
    var newList = [];
    if (events.length < stopCondition) {
      // ensures that the stop condition will not add 'undefined' to an index
      stopCondition = events.length;
    }
    if (stopCondition > 0 && events.length > 0) {
      for (var i = start; i < stopCondition; i++) {
        newList.push(events[i]);
      }
    } else {
      console.log('no items');
    }
    return newList;
  };

  const handleMouseEnter = index => {
    setMouseOver(index);
  };

  const handleMouseLeave = () => {
    setMouseOver(null);
  };

  // if no events
  if (events === null) {
    return (
      <Box className={classes.background}>
        <Container id='booking' className={classes.container}>
          <Typography variant='h2' component='h2' align='center' gutterBottom>
            Upcoming Events
          </Typography>
          <div className={classes.centerItem}>
            <SessionRequestButton user={user} />
          </div>
          <Typography variant='h6' align='center'>
            Looks like there are no upcoming events
          </Typography>
        </Container>
      </Box>
    );
  }

  // if still getting events
  if (!events.length > 0) {
    return (
      <Box className={classes.background}>
        <Container id='booking' className={classes.container}>
          <Typography variant='h2' component='h2' align='center' gutterBottom>
            Upcoming Events
          </Typography>

          <div className={classes.centerItem}>
            <SessionRequestButton user={user} />
          </div>

          <div className={classes.centerItem}>
            <CircularProgress color='secondary' />
          </div>
        </Container>
      </Box>
    );
  }

  return (
    <Box className={classes.background}>
      <Container id='booking' className={classes.container}>
        <Typography variant='h2' component='h2' align='center' gutterBottom>
          Upcoming Events
        </Typography>

        <div className={classes.centerItem}>
          <SessionRequestButton user={user} />
        </div>

        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={3}
          className={classes.grid}
        >
          {getMapableItems(0, 4).map((item, index) => {
            const startDate = item.start.toDate().toLocaleDateString();
            const startTime = item.start.toDate().toLocaleTimeString();
            const endTime = item.end.toDate().toLocaleTimeString();

            return (
              <Zoom key={index} in={true} timeout={parseInt(`${index + 9}00`)}>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <Paper elevation={mousOver === item.id ? 12 : 4} className={classes.paper}>
                    <ButtonBase
                      className={classes.buttonBase}
                      onClick={() => toggleDialog(item)}
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Typography variant='h6' algin='left' color='initial' gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant='body2'>{`Date: ${startDate}`}</Typography>
                      <Typography variant='body2'>{`${startTime} - ${endTime}`}</Typography>
                      <Typography variant='body2'>{`Location: ${item.location}`}</Typography>
                    </ButtonBase>
                  </Paper>
                </Grid>
              </Zoom>
            );
          })}
        </Grid>

        {events.length > 4 && (
          <Collapse in={expanded} timeout='auto'>
            <Grid
              container
              direction='row'
              justify='flex-start'
              alignItems='center'
              spacing={3}
              className={classes.grid}
            >
              {getMapableItems(4, events.length).map((item, index) => {
                const startDate = item.start.toDate().toLocaleDateString();
                const startTime = item.start.toDate().toLocaleTimeString();
                const endTime = item.end.toDate().toLocaleTimeString();

                return (
                  <Grid item key={index} xs={12} sm={12} md={6} lg={3}>
                    <Paper elevation={mousOver === item.id ? 12 : 4} className={classes.paper}>
                      <ButtonBase
                        className={classes.buttonBase}
                        onClick={() => toggleDialog(item)}
                        onMouseEnter={() => handleMouseEnter(item.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Typography variant='h6' gutterBottom>
                          {item.title}
                        </Typography>
                        <Typography variant='body2'>{`Date: ${startDate}`}</Typography>
                        <Typography variant='body2'>{`${startTime} - ${endTime}`}</Typography>
                        <Typography variant='body2'>{`Location: ${item.location}`}</Typography>
                      </ButtonBase>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Collapse>
        )}

        {events.length > 4 && (
          <Zoom in={true} timeout={800}>
            <Box className={classes.buttonContainer}>
              <IconButton
                onClick={toggleExpand}
                className={
                  expanded ? `${classes.moreButton} ${classes.moreButtonOpen}` : classes.moreButton
                }
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          </Zoom>
        )}
      </Container>
    </Box>
  );
}
