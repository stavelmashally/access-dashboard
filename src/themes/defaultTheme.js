import * as access from 'plugins/access';

const defaultTheme = {
  palette: {
    primary: {
      main: access.color('colors.primary'),
    },
    text: {
      secondary: access.color('colors.lightgray'),
    },
  },
};

export default defaultTheme