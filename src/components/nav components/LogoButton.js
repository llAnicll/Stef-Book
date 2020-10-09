import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton} from '@material-ui/core';
import LogoMin from 'assets/images/logoMin.png';

const useStyles = makeStyles(theme => ({
    logoButton: {
        height: '64px',
        marginRight: theme.spacing(2),
        padding: theme.spacing(1),
      },
      logo: {
        height: '54px',
      },
}))

export default function LogoButton() {
    const classes = useStyles();
    return (
      <IconButton edge='start' href='#home' className={classes.logoButton}>
        <img src={LogoMin} alt='logo' className={classes.logo}></img>
      </IconButton>
    );
  }