import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        h1: {
            fontSize: '2.5rem',
        },
        // Customize other typography settings here
    },
    // Add other customizations here
});

export default theme;