import { atom } from 'recoil';
import { fetchConfigSelector } from './selectors';

export const endpointsAtom = atom({
  key: 'endpointsAtom',
  default: { fetchEndpoint: null, postEndpoint: null },
});

export const configAtom = atom({
  key: 'configAtom',
  default: fetchConfigSelector,
});
