import { selector, DefaultValue } from 'recoil';
import { configAtom, endpointsAtom, postTriggerAtom } from './atoms';
import { addToConfig, replaceConfig, getFromConfig } from 'plugins/access/gate';
import * as Api from 'plugins/dashboard/api';

export const fetchConfigSelector = selector({
  key: 'fetchConfigSelector',
  get: async ({ get }) => {
    const fetchEndpoint = get(endpointsAtom).fetchEndpoint;
    const postEndpoint = get(endpointsAtom).postEndpoint;

    const { data } = await Api.fetchConfig(fetchEndpoint);
    await Api.postConfig({ endpoint: postEndpoint, config: {} });

    addToConfig(data);

    localStorage.setItem('fetch', fetchEndpoint);
    localStorage.setItem('post', postEndpoint);

    return data;
  },
});

export const saveConfigSelector = selector({
  key: 'saveConfigSelector',
  get: async ({ get }) => {
    get(postTriggerAtom);

    const { data } = await Api.postConfig({
      endpoint: get(endpointsAtom).postEndpoint,
      config: getFromConfig(),
    });

    return data;
  },
  set: ({ set }) => {
    set(postTriggerAtom, v => v + 1);
  },
});

export const restoreSelector = selector({
  key: 'restoreSelector',
  set: ({ get }) => {
    replaceConfig({ value: get(configAtom) });
  },
});