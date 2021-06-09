import { atom } from 'recoil';

const viewModeAtom = atom({
  key: 'viewModeAtom',
  default: true,
});

const selectedConfigAtom = atom({
  key: 'selectedConfigAtom',
  default: 'color',
});

const saveConfigAtom = atom({
  key: 'saveConfigAtom',
  default: true,
});

export { selectedConfigAtom, viewModeAtom, saveConfigAtom };
