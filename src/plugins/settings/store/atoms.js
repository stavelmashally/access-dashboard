import { atom } from 'recoil';

const viewModeAtom = atom({
  key: 'viewModeAtom',
  default: true,
});

const selectedConfigAtom = atom({
  key: 'selectedConfigAtom',
  default: 'color',
});

const hasErrorAtom = atom({
  key: 'hasErrorAtom',
  default: false,
});

export { selectedConfigAtom, viewModeAtom, hasErrorAtom };
