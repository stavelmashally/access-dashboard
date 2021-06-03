import Layout from './Layout';
import Editor from '../plugins/settings/Editor';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as access from '../plugins/access';

import { RecoilRoot, atom, selector } from 'recoil';

export const appState = atom({
  key: 'appState',
  default: { element: null },
});

export const elementSelector = selector({
  key: 'elementState',
  get: ({ get }) => {
    const {element} = get(appState);

    return element;
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: access.color('colors.primary'),
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Layout>
          <Editor />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
