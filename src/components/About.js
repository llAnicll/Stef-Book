import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, SvgIcon, Zoom, Slide } from '@material-ui/core';
// Other (credit in footer)
// import graph from 'assets/icons/graph.png';
// import coach from 'assets/icons/coach.png';
// import player from 'assets/icons/player.png';
// import certificate from 'assets/icons/certificate.png';
// MUI Icons
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';
import SportsVolleyballOutlinedIcon from '@material-ui/icons/SportsVolleyballOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import Filter9PlusOutlinedIcon from '@material-ui/icons/Filter9PlusOutlined';
import stefImgMin from 'assets/images/stefImgMin.jpg';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutHeader: {
    marginBottom: theme.spacing(4),
  },
  image: {
    width: '80%',
    height: 'auto',
    borderRadius: '4px',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70%',
      marginBottom: theme.spacing(1),
    },
  },
  item: {
    background: '#f9f9f9',
    margin: theme.spacing(1),
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    maxWidth: '310px',
    minHeight: '242px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      minHeight: '242px',
    },
  },
  icon: {
    // alt icons
    width: '64px',
    margin: '0 auto',
    marginBottom: theme.spacing(1),
  },
  imgItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  svgIcon: {
    fontSize: 50,
    margin: '0 auto',
    marginBottom: theme.spacing(2),
  },
}));

export default function About() {
  const classes = useStyles();

  const items = [
    {
      header: `Development  Coach of the Year`,
      text: 'Mikasa Awards 2019 Development coach of the year',
      icon: TrendingUpOutlinedIcon, // graph
      timeOut: 1000,
    },
    {
      header: 'Former Professional Player',
      text: '11 Years of professional volleyball for Romania, Sweden and Spain',
      icon: SportsVolleyballOutlinedIcon, // player
      timeOut: 1250,
    },
    {
      header: 'Over 9 Years of Coaching',
      text: '9 Years of coaching, club volleyball, clinics, and private sessions',
      icon: Filter9PlusOutlinedIcon, //coach
      timeOut: 1500,
    },
    {
      header: 'National Coaching Certification',
      text: 'Level 2 NCCP in Canada (Level 3 in Europe)',
      icon: BeenhereOutlinedIcon, // certificate
      timeOut: 1600,
    },
  ];

  return (
    <Container id='about' component='section' className={classes.container}>
      <Typography
        variant='h2'
        component='h2'
        align='center'
        gutterBottom
        className={classes.aboutHeader}
      >
        About
      </Typography>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Slide direction='right' in={true} timeout={1000}>
          <Grid item xs={12} sm={12} md={5} className={classes.imgItem}>
            <img className={classes.image} src={stefImgMin} alt='item visual'></img>
          </Grid>
        </Slide>

        <Grid item xs={12} sm={12} md={7}>
          <Grid container direction='row' justify='center' alignItems='center'>
            {items.map((item, index) => (
              <Zoom key={index} in={true} timeout={parseInt(`${index + 10}00`)}>
                <Grid item sm={6} md={6} className={classes.imgItem}>
                  <Paper variant='outlined' className={classes.item}>
                    <SvgIcon component={item.icon} color='primary' className={classes.svgIcon} />
                    <Typography variant='h3' component='h3' align='center' gutterBottom>
                      {item.header}
                    </Typography>
                    <Typography variant='body1' component='p' align='center'>
                      {item.text}
                    </Typography>
                  </Paper>
                </Grid>
              </Zoom>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

// <img src={item.icon} alt='' className={classes.icon}></img>
