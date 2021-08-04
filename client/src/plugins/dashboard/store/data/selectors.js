import { selector } from 'recoil';
import { configAtom, endpointsAtom } from './atoms';
import { addToConfig, replaceConfig } from 'plugins/access/gate';
import * as Api from 'plugins/dashboard/api';

export const fetchConfigSelector = selector({
  key: 'fetchConfigSelector',
  get: async ({ get }) => {
    const fetchUrl =
      localStorage.getItem('fetch') || get(endpointsAtom).fetchEndpoint;
    
    const { data } = await Api.fetchConfig(fetchUrl);
    addToConfig(data);
    localStorage.setItem('fetch', fetchUrl);

    return data;
  },
});

export const restoreSelector = selector({
  key: 'restoreSelector',
  set: ({ get }) => {
    replaceConfig({ value: get(configAtom) });
  },
});
