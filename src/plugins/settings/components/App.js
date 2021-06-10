import Header from './Header';
import Sidebar from './Sidebar';
import EditorSection from './Editor/EditorSection';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Themes from 'themes';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

function App() {
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
}

export default App;
