import { selector } from 'recoil';
import { defaultConfigAtom } from './atoms';
import { addToConfig, replaceConfig } from 'plugins/access/gate';
import * as Api from 'plugins/dashboard/api';

const fetchConfigSelector = selector({
  key: 'fetchConfigSelector',
  get: async () => {
    const [{ data: defaultConfig }, { data: modifyConfig }] = await Promise.all(
      [Api.fetchDefaultConfig(), Api.fetchModifyConfig()]
    );

    addToConfig(defaultConfig);
    addToConfig(modifyConfig);

    return defaultConfig;
  },
});

const restoreDefaultSelector = selector({
  set: ({ get }) => {
    replaceConfig({ value: get(defaultConfigAtom) });
  },
});


export { fetchConfigSelector, restoreDefaultSelector };
