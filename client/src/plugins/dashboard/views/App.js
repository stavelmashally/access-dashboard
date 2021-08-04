import Dashboard from './Dashboard';
import Settings from './Settings';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { useRecoilValueLoadable } from 'recoil';
import { configAtom } from '../store/data';
import Themes from 'themes';
import styled from 'styled-components/macro';
import Loader from '../components/shared/Loader';

const App = () => {
  const { state } = useRecoilValueLoadable(configAtom);

  const loading = state === 'loading';
  const error = state === 'hasError';

  return (
    <ThemeProvider theme={Themes.default}>
      <CssBaseline />
      <AppContainer>
        <ErrorBoundary>
          {loading ? <Loader /> : error ? <Settings /> : <Dashboard />}
        </ErrorBoundary>
      </AppContainer>
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export default App;
