import { atom } from 'recoil';
import { fetchConfigSelector } from './selectors';

export const endpointsAtom = atom({
  key: 'endpointsAtom',
  default: {
    fetchEndpoint: localStorage.getItem('access-get-endpoint') || null,
    postEndpoint: localStorage.getItem('access-post-endpoint') || null,
  },
});

export const configAtom = atom({
  key: 'configAtom',
  default: fetchConfigSelector,
});

export const postTriggerAtom = atom({
  key: 'postTriggerAtom',
  default: 0,
});
