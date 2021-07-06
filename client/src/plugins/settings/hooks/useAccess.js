import { useRecoilState } from 'recoil';
import { refreshAtom } from 'plugins/settings/store';
import * as access from 'plugins/access';
import * as Access from 'plugins/access/gate';

export const useAccess = path => {
  const [, setRefresh] = useRecoilState(refreshAtom);

  const getConfigValues = () => {
    return access[path]();
  };

  const getConfig = () => {
    return JSON.stringify(Access.getFromConfig(path), null, 2);
  };

  const replaceConfig = config => {
    Access.replaceConfig({ path, value: config });
  };

  const AddField = value => {
    Access.addConfigProperty({ path, value });
    setRefresh({});
  };

  const changeValue = ({ label, value }) => {
    Access.setConfigValue({ path: `${path}.${label}`, value });
    setRefresh({});
  };

  const changeLabel = ({ label, value }) => {
    Access.renameConfigProperty({
      path: label ? `${path}.${label}` : path,
      propName: value,
    });
    setRefresh({});
  };

  const DeleteField = ({ propName }) => {
    const propPath = propName ? `${path}.${propName}` : path;
    Access.deleteConfigProperty(propPath);
    setRefresh({});
  };

  const AddSection = () => {
    const sectionValue = path === 'format' ? '' : {};
    Access.addConfigProperty({
      path,
      value: { sectionTitle: sectionValue },
    });
    setRefresh({});
  };

  return {
    getConfig,
    getConfigValues,
    replaceConfig,
    AddField,
    AddSection,
    changeLabel,
    changeValue,
    DeleteField,
    setRefresh,
  };
};
