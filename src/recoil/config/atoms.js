import { atom } from 'recoil';

const selectedConfigAtom = atom({
  key: 'selectedConfigAtom',
  default: null,
});

export { selectedConfigAtom };
