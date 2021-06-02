import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  appBar: {
    width: `calc(100% - 240px)`,
    display: 'flex',
  },
  appBarItems: {
    display: 'flex',
    alignItems: 'space-between',
  },
}));
