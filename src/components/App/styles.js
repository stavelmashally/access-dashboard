import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: `calc(100vw - 240px)`,
    background: '#f1f1f1',
    minHeight: '100vh',
  },
}));
