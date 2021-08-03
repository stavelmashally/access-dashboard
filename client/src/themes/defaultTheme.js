const defaultTheme = {
  palette: {
    primary: {
      main: '#163153',
    },
    secondary: {
      main: '#0188EC',
    },
    text: {
      primary: '#012333',
      secondary: '#485861',
    },
    background: {
      default: '#F6F7FF',
    },
  },
  typography: {
    h6: {
      fontSize: '1.1rem',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {},
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#a4a4a4',
          borderRadius: 4,
        },
      },
    },
  },
};

export default defaultTheme;
