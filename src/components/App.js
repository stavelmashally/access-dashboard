import Header from './Header';
import Sidebar from './Sidebar';
import EditorSection from './EditorSection';
import { ThemeProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
import Themes from 'themes'

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={Themes.default}>
      <AppContainer>
        <Header />
        <Sidebar />
        <EditorSection />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
