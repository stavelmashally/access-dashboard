import { selector } from 'recoil';
import { addToConfig } from 'plugins/access/gate';
import * as Api from 'plugins/settings/api';

const fetchConfigSelector = selector({
  key: 'fetchConfigSelector',
  get: async () => {
    const [defaultConfig, modifyConfig] = await Promise.all([
      Api.getDefaultConfig(),
      Api.getModifyConfig(),
    ]);
    addToConfig(...defaultConfig.data);
    addToConfig(...modifyConfig.data);
  },
});

export { fetchConfigSelector };
