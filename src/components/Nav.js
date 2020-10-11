import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar, CssBaseline } from '@material-ui/core';
import Footer from 'components/Footer';
import LogoButton from 'components/nav components/LogoButton';
import HeaderText from 'components/nav components/HeaderText';
import MenuButton from 'components/nav components/MenuButton';
import HeaderLinks from 'components/nav components/HeaderLinks';
import MobileDrawer from 'components/nav components/MobileDrawer';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  content: {
    diplay: 'flex',
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Nav(props) {
  const { children, user } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const links = [
    { route: '#home', text: 'Home', icon: HomeIcon },
    { route: '#booking', text: 'Events', icon: EventIcon },
    { route: '#about', text: 'About', icon: InfoIcon },
    { route: '#contact', text: 'Contact', icon: EmailIcon },
    { route: '#sign-in', text: 'Google sign-in', in: LockOpenIcon, out: LockIcon },
  ];

  const toggleDrawerState = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <Box component='div' className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' elevation={0} className={classes.appBar}>
        <Toolbar>
          <LogoButton />
          <HeaderText />
          <MenuButton onClick={toggleDrawerState} />
          <HeaderLinks links={links} user={user} />
        </Toolbar>
      </AppBar>
      <MobileDrawer open={open} links={links} user={user} toggleDrawer={toggleDrawerState} />
      <Box id='home' component='main' className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
