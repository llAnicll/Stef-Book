import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import {Hidden, IconButton} from '@material-ui/core'

export default function MenuButton(props) {
    const { onClick } = props;
    return (
      <Hidden mdUp implementation='css'>
        <IconButton color='inherit' onClick={onClick}>
          <MenuIcon />
        </IconButton>
      </Hidden>
    );
}