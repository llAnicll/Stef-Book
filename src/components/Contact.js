import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography, TextField, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.palette.primary.main,
  },
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    marginBottom: theme.spacing(4),
  },
  form: {
    width: '100%',
  },
  submitBtn: {
    marginTop: theme.spacing(1),
  },
}));

export default function Contact() {
  const classes = useStyles();
  const [input, setInput] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setInput(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = () => {
    const to = 'mailto:volleyballyyc@gmail.com';
    const subject = `?subject=Volleyball%20YYC`;
    const body = `&body=From:%20${input.name}%0AEmail:%20${input.email}%0A%0A${input.message}`;
    const url = to + subject + body;
    window.open(url, '_blank');
  };

  return (
    <Box id='contact' className={classes.background}>
      <Container component='section' className={classes.container}>
        <Typography variant='h2' component='h2' align='center' className={classes.headerText}>
          Get in touch
        </Typography>
        <form onSubmit={submit} className={classes.form}>
          <Grid container direction='row' justify='center' alignItems='center' spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label='Name'
                name='name'
                type='text'
                variant='outlined'
                fullWidth
                required
                color='secondary'
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label='Email'
                name='email'
                type='email'
                variant='outlined'
                fullWidth
                required
                color='secondary'
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Message'
                name='message'
                type='text'
                multiline
                rows={8}
                variant='outlined'
                fullWidth
                required
                color='secondary'
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          <Button variant='outlined' type='submit' size='large' className={classes.submitBtn}>
            Submit
          </Button>
        </form>
      </Container>
    </Box>
  );
}
