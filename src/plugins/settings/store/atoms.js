import { atom } from 'recoil';
import { fetchConfigSelector } from './selectors';

const viewModeAtom = atom({
  key: 'viewModeAtom',
  default: true,
});

const defaultConfigAtom = atom({
  key: 'configAtom',
  default: fetchConfigSelector,
});

const restoreAtom = atom({
  key: 'restoreAtom',
  default: false,
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
  defaultConfigAtom,
  selectedConfigAtom,
  viewModeAtom,
  hasErrorAtom,
  restoreAtom,
};
