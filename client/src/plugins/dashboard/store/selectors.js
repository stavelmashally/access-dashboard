import { selector } from 'recoil';
import { configAtom, configEndpointsAtom } from './atoms';
import { addToConfig, replaceConfig } from 'plugins/access/gate';
import * as Api from 'plugins/dashboard/api';

/* const fetchConfigSelector = selector({
  key: 'fetchConfigSelector',
  get: async () => {
    const [{ data: defaultConfig }, { data: modifyConfig }] = await Promise.all(
      [Api.fetchDefaultConfig(), Api.fetchModifyConfig()]
    );

    addToConfig(defaultConfig);
    addToConfig(modifyConfig);

    return defaultConfig;
  },
}); */

const fetchConfigSelector = selector({
  key: 'fetchConfigSelector',
  get: async ({ get }) => {
    const { fetchUrl } = get(configEndpointsAtom);
    const config = await Api.fetchConfig(fetchUrl);

    addToConfig(config);
      
    return config;
  },
});

const restoreDefaultSelector = selector({
  set: ({ get }) => {
    replaceConfig({ value: get(configAtom) });
  },
});

export { fetchConfigSelector, restoreDefaultSelector };
