import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Typography, Link, Zoom } from '@material-ui/core';
import firebase from 'fbConfig';

const useStyles = makeStyles(theme => ({
  links: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function HeaderLinks(props) {
  const { links, user } = props;
  const classes = useStyles();

  const authorize = async e => {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const signOut = e => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  return (
    <Hidden smDown implementation='css'>
      <Zoom in={true} timeout={1000}>
        <Typography className={classes.links}>
          {links.map((link, index) =>
            link.route === '#sign-in' ? (
              !user ? (
                <Link key={link.text} href='' color='inherit' onClick={authorize}>
                  {link.text}
                </Link>
              ) : (
                <Link key={link.text} href='' color='inherit' onClick={signOut}>
                  Sign-out
                </Link>
              )
            ) : (
              <Link key={link.text} href={link.route} color='inherit'>
                {link.text}
              </Link>
            )
          )}
        </Typography>
      </Zoom>
    </Hidden>
  );
}
