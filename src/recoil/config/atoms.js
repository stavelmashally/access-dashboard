import { atom } from 'recoil';

const configAtom = atom({
  key: 'configAtom',
  default: null,
});

const activeConfigAtom = atom({
  key: 'activeConfigAtom',
  default: null,
});

export { configAtom, activeConfigAtom };
