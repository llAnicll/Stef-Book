import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography, Divider, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.palette.primary.main,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  copyright: {
    color: 'rgba(0,0,0,0.5)',
  },
}));

// TODO : make sure that you (Cailan) add the reference links for the icons
export default function Footer() {
  const classes = useStyles();
  return (
    <Box className={classes.background}>
      <Divider variant='middle' />
      <Container className={classes.container}>
        <Typography align='center' className={classes.copyright}>
          &copy; Copyright 2020 Stefan Filip
        </Typography>
        <Typography align='center' className={classes.copyright}>
        </Typography>
      </Container>
    </Box>
  );
}

// <a target="_blank" href="https://icons8.com/icons/set/improvement">Improvement icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icons/set/volleyball-2">Volleyball Player icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icons/set/certificate">Certificate icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icons/set/personal-trainer">Personal Trainer icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>