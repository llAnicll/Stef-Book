import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Hidden,
} from '@material-ui/core';
import firebase from 'fbConfig';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
    height: '100%',
    background: theme.palette.primary.light,
  },
}));

export default function MobileDrawer(props) {
  const { links, open, user, toggleDrawer } = props;
  const classes = useStyles();

  const authorize = async e => {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    toggleDrawer();
  };

  const signOut = e => {
    e.preventDefault();
    firebase.auth().signOut();
    toggleDrawer();
  };

  const drawerList = (
    <Box component='div' className={classes.list}>
      <Toolbar />
      <List>
        {links.map((link, index) =>
          link.route === '#sign-in' ? (
            !user ? (
              <ListItem button component='a' href='' key={index} onClick={authorize}>
                <ListItemIcon>
                  <link.in />
                </ListItemIcon>
                <ListItemText primary='Sign-in' />
              </ListItem>
            ) : (
              <ListItem button component='a' href='' key={index} onClick={signOut}>
                <ListItemIcon>
                  <link.out />
                </ListItemIcon>
                <ListItemText primary='Sign-out' />
              </ListItem>
            )
          ) : (
            <ListItem button component='a' href={link.route} key={index} onClick={toggleDrawer}>
              <ListItemIcon>
                <link.icon />
              </ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItem>
          )
        )}
      </List>
    </Box>
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
