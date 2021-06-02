import Header from '../Header';
import SideBar from '../Sidebar';
import Editor from '../Editor';
import { Toolbar } from '@material-ui/core';
import useStyles from './styles';

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
