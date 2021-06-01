import Header from '../Header';
import SideBar from '../Sidebar';
import Editor from '../Editor';
import useStyles from './styles';
import { Toolbar } from '@material-ui/core';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <SideBar />
      <main className={classes.content}>
        <Toolbar />
        <Editor />
      </main>
    </div>
  );
}

export default App;
