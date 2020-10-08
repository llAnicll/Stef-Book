import { createMuiTheme } from '@material-ui/core/styles';

/**
 * Primary: #19C9E6
 * Secondary: #E63619
 */

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
    },
    primary: {
      light: 'rgba(71, 211, 235, 1)',
      main: 'rgba(25, 201, 230, 1)',
      dark: 'rgba(17, 140, 161, 1)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(235, 94, 71, 1)',
      main: 'rgba(230, 54, 25, 1)',
      dark: 'rgba(161, 37, 17, 1)',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    h1: {
      fontSize: '4rem',
      fontWeight: 400,
      color: '#fff', // this could go
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
    },
    h3: {
      fontSize: '1.55rem',
      fontWeight: 400,
    },
  },
});

export default theme;
