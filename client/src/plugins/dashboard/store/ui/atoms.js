import { atom } from 'recoil';

export const viewModeAtom = atom({
  key: 'viewModeAtom',
  default: true,
});

export const confirmModalAtom = atom({
  key: 'confirmModalAtom',
  default: { message: '', onConfirm: null },
});

export const forceUpdateAtom = atom({
  key: 'forceUpdateAtom',
  default: 0,
});

export const selectedAtom = atom({
  key: 'selectedAtom',
  default: 'color',
});

export const hasErrorAtom = atom({
  key: 'hasErrorAtom',
  default: false,
});