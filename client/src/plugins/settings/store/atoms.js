import { atom } from 'recoil';
import { fetchConfigSelector } from './selectors';

const confirmModalAtom = atom({
  key: 'confirmModalAtom',
  default: {message: '', onConfirm: undefined}
});

const viewModeAtom = atom({
  key: 'viewModeAtom',
  default: true,
});

const defaultConfigAtom = atom({
  key: 'configAtom',
  default: fetchConfigSelector,
});

const refreshAtom = atom({
  key: 'refreshAtom',
  default: {},
});

const selectedConfigAtom = atom({
  key: 'selectedConfigAtom',
  default: 'color',
});

const hasErrorAtom = atom({
  key: 'hasErrorAtom',
  default: false,
});

const expandedAtom = atom({
  key: 'expandedAtom',
  default: {},
});

export {
  defaultConfigAtom,
  selectedConfigAtom,
  viewModeAtom,
  hasErrorAtom,
  refreshAtom,
  expandedAtom,
  confirmModalAtom
};
