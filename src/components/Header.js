import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography, Button, Hidden, SvgIcon } from '@material-ui/core';
import { Zoom } from '@material-ui/core';
// import clinic from 'assets/icons/clinic.png'; // alt
// import smallGroup from 'assets/icons/smallGroup.png'; // alt
// import privateSession from 'assets/icons/privateSession.png'; // alt
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import backgroundMin from 'assets/images/backgroundMin.jpg';

const useStyles = makeStyles(theme => ({
  background: {
    height: '100%',
    width: '100%',
    backgroundImage: `url(${backgroundMin})`,
    backgroundSize: 'cover',
    backgroundPosition: '50% 10%',
    backgroundRepeat: 'no-repeat',
  },
  filter: {
    width: 'inherit',
    height: 'inherit',
    background: 'rgba(75,75,93,0.85)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    height: 'calc(100vh - 55px)',
  },
  headerText: {
    fontWeight: 600,
    textShadow: '0 0 10px rgba(0,0,0,0.5)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
    },
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  button: {
    alignSelf: 'center',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  item: {
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    width: '64px',
    margin: '0 auto',
    marginBottom: theme.spacing(1),
  },
  iconHeader: {
    color: '#fff',
  },
  iconText: {
    color: 'rgba(255,255,255,0.6)',
  },
  svgIcon: {
    fontSize: 90,
    margin: '0 auto',
    marginBottom: theme.spacing(1),
  },
}));

export default function Header(props) {
  const classes = useStyles();

  const items = [
    {
      header: 'Private Sessions',
      text: 'One on one skills training for just you',
      icon: PersonIcon, // privateSession
      grow: 1000,
    },
    {
      header: 'Small Groups',
      text: 'Skills training for small groups',
      icon: GroupIcon, // smallGroup
      grow: 1200,
    },
    {
      header: 'Clinics',
      text: 'Learn and develop skills with others',
      icon: GroupAddIcon, // clinic
      grow: 1400,
    },
  ];

  const openBooking = () => {
    window.location.href = '#booking';
  };

  return (
    <Box className={classes.background}>
      <Box className={classes.filter}>
        <Container component='section' className={classes.header}>
          <Zoom in={true} timeout={800}>
            <Typography variant='h1' component='h1' align='center' className={classes.headerText}>
              Volleyball Skills Training
            </Typography>
          </Zoom>
          <Hidden smDown implementation='css'>
            <Box component='div' className={classes.itemsContainer}>
              {items.map((item, index) => (
                <Zoom key={index} in={true} timeout={parseInt(`${index + 8}00`)}>
                  <Box variant='outlined' className={classes.item}>
                    <SvgIcon component={item.icon} color='primary' className={classes.svgIcon} />

                    <Typography
                      variant='h3'
                      component='h3'
                      align='center'
                      className={classes.iconHeader}
                    >
                      {item.header}
                    </Typography>
                    <Hidden smDown implementation='css'>
                      <Typography
                        variant='body1'
                        component='p'
                        align='center'
                        className={classes.iconText}
                      >
                        {item.text}
                      </Typography>
                    </Hidden>
                  </Box>
                </Zoom>
              ))}
            </Box>
          </Hidden>
          <Zoom in={true} timeout={1000}>
            <Button
              variant='contained'
              size='large'
              color='secondary'
              className={classes.button}
              onClick={openBooking}
            >
              View Events
            </Button>
          </Zoom>
        </Container>
      </Box>
    </Box>
  );
}
// <img src={item.icon} alt='' className={classes.icon}></img>
