import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Themes from 'themes';
import styled from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={Themes.default}>
      <CssBaseline />
      <AppContainer>
        <Header />
        <Sidebar />
        <MainContent />
      </AppContainer>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default App;
