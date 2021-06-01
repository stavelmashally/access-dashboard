import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  appBar: {
    display: 'flex',
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarItems: {
    display: 'flex',
    alignItems: 'space-between',
  },
}));
