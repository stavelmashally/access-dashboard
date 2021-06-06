import Header from './Header';
import Sidebar from './Sidebar';
import EditorSection from './EditorSection';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
import * as access from 'plugins/access';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: access.color('colors.primary'),
    },
  },
});

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header />
        <Sidebar />
        <EditorSection />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
