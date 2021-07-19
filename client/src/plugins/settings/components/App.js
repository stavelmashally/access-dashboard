import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import MainContent from './views/MainContent';
import ErrorBoundary from './shared/ErrorBoundary';
import ConfirmModal from './shared/ConfirmModal';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Themes from 'themes';
import styled from 'styled-components/macro';

const App = () => {
  return (
    <ThemeProvider theme={Themes.default}>
      <CssBaseline />
      <AppContainer>
        <ErrorBoundary>
          <Header />
          <Sidebar />
          <MainContent />
          <ConfirmModal />
        </ErrorBoundary>
      </AppContainer>
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export default App;
