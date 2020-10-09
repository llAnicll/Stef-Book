import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Drawer, Toolbar, List, ListItem, ListItemText, Hidden} from '@material-ui/core'
import firebase from 'fbConfig'

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
    },
    backgroundD: {
      background: theme.palette.primary.main
    }
}))

export default function MobileDrawer(props) {
  const { links, open, user, toggleDrawer } = props;
  const classes = useStyles();

  const authorize = async e => {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
  }

  const signOut = e => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  const drawerList = (
    <Box component='div' className={classes.list}>
      <Toolbar />
      <List>
        {links.map((link, index) => (
          link.route === '#sign-in' ? (
            !user ? (
              <ListItem button component='a' href='' key={index} onClick={authorize}>
                <ListItemText primary='Sign-in' />
              </ListItem>
            ) : (
              <ListItem button component='a' href='' key={index} onClick={signOut}>
                <ListItemText primary='Sign-out' />
              </ListItem>
            )

          ) : (
            <ListItem button component='a' href={link.route} key={index} onClick={toggleDrawer}>
              <ListItemText primary={link.text} />
            </ListItem>
          )
        ))}
      </List>
    </Box>
  );

  return (
    <Box component='nav'>
      <Hidden mdUp implementation='css'>
        <Drawer anchor='left' variant='temporary' open={open} onClose={toggleDrawer} className={classes.backgroundD}>
          {drawerList}
        </Drawer>
      </Hidden>
    </Box>
  );
}