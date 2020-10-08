import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { AppBar, Toolbar, Drawer, CssBaseline } from '@material-ui/core';
import { Box, IconButton, Typography, Hidden, Link, Button } from '@material-ui/core';
import Logo from 'assets/images/logo.png';
import MenuIcon from '@material-ui/icons/Menu';
import Footer from 'components/Footer';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  logoButton: {
    height: '64px',
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
  },
  logo: {
    height: '54px',
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  content: {
    diplay: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  links: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  googleSignIn: {
    marginLeft: theme.spacing(2)
  }
}));

export default function Nav(props) {
  const { children, user } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const links = [
    { route: '#home', text: 'Home', auth: false },
    { route: '#booking', text: 'Events', auth: false },
    { route: '#about', text: 'About', auth: true },
    { route: '#contact', text: 'Contact', auth: true },
    { route: '#sign-in', text: 'Google Sign-in', auth: true },
  ];

  const toggleDrawerState = () => {
    setOpen(prevState => !prevState);
  };

  // TODO: make the create button available to only users with granded scope
  return (
    <Box component='div' className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' elevation={0} className={classes.appBar}>
        <Toolbar>
          <LogoButton/>
          <HeaderText/>
          <MenuButton onClick={toggleDrawerState}/>
          <HeaderLinks links={links} user={user}/>
        </Toolbar>
      </AppBar>
      <MobileDrawer open={open} links={links} toggleDrawer={toggleDrawerState} />
      <Box id='home' component='main' className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

function LogoButton() {
  const classes = useStyles();
  return (
    <IconButton edge='start' href='#home' className={classes.logoButton}>
      <img src={Logo} alt='logo' className={classes.logo}></img>
    </IconButton>
  );
}

function HeaderText() {
  const classes = useStyles();
  return (
    <Typography variant='h6' className={classes.title}>Volleyball YYC</Typography>
  );
}

function MenuButton(props) {
  const { onClick } = props;
  return (
    <Hidden mdUp implementation='css'>
      <IconButton color='inherit' onClick={onClick}>
        <MenuIcon />
      </IconButton>
    </Hidden>
  );
}

function HeaderLinks(props) {
  const { links, user } = props;
  const classes = useStyles();

  const authorize = async () => {
      await window.gapi.auth2.getAuthInstance().signIn();
  }

  return (
    <Hidden smDown implementation='css'>
      <Typography className={classes.links}>
        {links.map(link => (
          link.route === '#sign-in' ? (
            !user && <Link key={link.text} href='' color='inherit' onClick={authorize} >{link.text}</Link>
          ) : (
            <Link key={link.text} href={link.route} color='inherit' >{link.text}</Link>
          )
        ))}
      </Typography>
    </Hidden>
  );
}

function MobileDrawer(props) {
  const { links, open, toggleDrawer } = props;
  const classes = useStyles();

  const drawerList = (
    <div className={classes.list}>
      <Toolbar />
      <List>
        {links.map((link, index) => (
          <ListItem button component='a' href={link.route} key={index}>
            <ListItemText primary={link.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box component='nav'>
      <Hidden mdUp implementation='css'>
        <Drawer anchor='left' variant='temporary' open={open} onClose={toggleDrawer}>
          {drawerList}
        </Drawer>
      </Hidden>
    </Box>
  );
}
