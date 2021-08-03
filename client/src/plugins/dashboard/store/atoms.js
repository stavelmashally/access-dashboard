import { atom } from 'recoil';
import { fetchConfigSelector } from './selectors';

const confirmModalAtom = atom({
  key: 'confirmModalAtom',
  default: { message: '', onConfirm: undefined },
});

const viewModeAtom = atom({
  key: 'viewModeAtom',
  default: true,
});

const configEndpointsAtom = atom({
  key: 'configEndpointsAtom',
  default: { fetchUrl: null, postUrl: null },
});

const configAtom = atom({
  key: 'configAtom',
  default: fetchConfigSelector,
});

const forceUpdateAtom = atom({
  key: 'forceUpdateAtom',
  default: 0,
});

const selectedConfigAtom = atom({
  key: 'selectedConfigAtom',
  default: 'color',
});

const hasErrorAtom = atom({
  key: 'hasErrorAtom',
  default: false,
});


export {
  configEndpointsAtom,
  configAtom,
  selectedConfigAtom,
  viewModeAtom,
  hasErrorAtom,
  forceUpdateAtom,
  confirmModalAtom,
};
