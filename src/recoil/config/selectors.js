import { selector } from 'recoil';
import { addToConfig } from 'plugins/access/gate';
import * as api from 'plugins/api';

const fetchConfigSelector = selector({
  key: 'fetchConfigSelector',
  get: async () => {
    const { data: defaultConfig } = await api.getDefaultConfig();
    addToConfig(...defaultConfig);
    const { data: modifyConfig } = await api.getModifyConfig();
    addToConfig(...modifyConfig);
  },
});

export { fetchConfigSelector };
