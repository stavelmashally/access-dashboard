import { selector } from 'recoil';
import { addToConfig } from 'plugins/access/gate';
import * as Api from 'plugins/settings/api';

const fetchConfigSelector = selector({
  key: 'fetchConfigSelector',
  get: async () => {
    const [{ data: defaultConfig }, { data: modifyConfig }] = await Promise.all(
      [Api.fetchDefaultConfig(), Api.fetchModifyConfig()]
    );
    addToConfig(defaultConfig);
    addToConfig(modifyConfig);

    return defaultConfig
  },
});

export { fetchConfigSelector };
