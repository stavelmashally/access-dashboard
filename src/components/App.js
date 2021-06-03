import Layout from './Layout';
import Editor from '../plugins/settings/Editor';
import { RecoilRoot, atom } from 'recoil';

const appState = atom({
  key: 'appState',
  default: {},
});

function App() {
  return (
    <RecoilRoot>
      <Layout>
        <Editor />
      </Layout>
    </RecoilRoot>
  );
}

export default App;
