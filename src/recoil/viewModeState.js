import { atom } from 'recoil';

const viewModeAtom = atom({
  key: 'viewModeAtom',
  default: false,
});

export default viewModeAtom;
