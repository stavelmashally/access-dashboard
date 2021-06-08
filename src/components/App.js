import Header from './Header';
import Sidebar from './Sidebar';
import EditorSection from './EditorSection';
import Loader from './Loader';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Themes from 'themes';
import styled from 'styled-components';
import { useRecoilValueLoadable } from 'recoil';
import { fetchConfigSelector } from 'recoil/config';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

function App() {
  const fetchConfigs = useRecoilValueLoadable(fetchConfigSelector);

  // eslint-disable-next-line default-case
  switch (fetchConfigs.state) {
    case 'hasValue':
      return (
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <AppContainer>
            <Header />
            <Sidebar />
            <EditorSection />
          </AppContainer>
        </ThemeProvider>
      );
    case 'loading':
      return <Loader />;
    case 'hasError':
      return <div>error</div>;
  }
}

export default App;
