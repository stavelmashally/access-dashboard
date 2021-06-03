import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export default makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  title: {
    padding: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#8D8D8D',
  },
  itemActiveText: {
    color: '#272727',
  },
}));
