import * as access from 'plugins/access';

const defaultTheme = {
  palette: {
    primary: {
      main: access.color('access.primary'),
    },
    text: {
      secondary: access.color('access.secondary'),
    },
    background: {
      default: access.color('access.background'),
    },
  },
};

export default defaultTheme;
