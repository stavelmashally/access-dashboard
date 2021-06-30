import * as access from 'plugins/access';

const defaultTheme = {
  palette: {
    primary: {
      main: access.color('access.primary'),
    },
    secondary: {
      main: access.color('access.secondary'),
    },
    text: {
      primary: access.color('access.primaryText'),
      secondary: access.color('access.secondaryText'),
    },
    background: {
      default: access.color('access.background'),
    },
  },
};

export default defaultTheme;
