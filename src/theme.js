// src/theme.js
import { createTheme } from '@mui/material/styles';

// Define your color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#0d3b66', // Dark Blue
    },
    secondary: {
      main: '#f4d35e', // Yellow
    },
    error: {
      main: '#f95738', // Red-Orange
    },
    background: {
      default: '#faf0ca', // Light Beige
    },
    warning: {
      main: '#ee964b', // Orange
    },
  },
  typography: {
    // You can customize typography here if needed
  },
});

export default theme;
