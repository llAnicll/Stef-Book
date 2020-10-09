import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar, CssBaseline } from '@material-ui/core';
import Footer from 'components/Footer';
import LogoButton from 'components/nav components/LogoButton'
import HeaderText from 'components/nav components/HeaderText';
import MenuButton from 'components/nav components/MenuButton';
import HeaderLinks from 'components/nav components/HeaderLinks';
import MobileDrawer from 'components/nav components/MobileDrawer';

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
  const { children, user, admin, toggleCreate } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const links = [
    { route: '#home', text: 'Home', auth: false },
    { route: '#booking', text: 'Events', auth: false },
    { route: '#about', text: 'About', auth: true },
    { route: '#contact', text: 'Contact', auth: true },
    { route: '#sign-in', text: 'Google sign-in', auth: true },
  ];

  const toggleDrawerState = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <Box component='div' className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' elevation={0} className={classes.appBar}>
        <Toolbar>
          <LogoButton/>
          <HeaderText/>
          <MenuButton onClick={toggleDrawerState}/>
          <HeaderLinks links={links} user={user} admin={admin} toggleCreate={toggleCreate}/>
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