import { selector } from 'recoil';
import { configAtom, activeConfigAtom } from './atoms';
import { addToConfig, getFromConfig } from 'plugins/access/gate';
import axios from 'axios';

const getFromEndpoint = kind =>
  `http://localhost:5588/mocking_G/generate?library=${kind}Config&category=all&amount=1`;

const fetchConfigSelector = selector({
  key: 'fetchConfigSelector',
  get: async () => {
    const response = await axios.get(getFromEndpoint('default'));
    addToConfig(...response.data);
    const res = await axios.get(getFromEndpoint('modify'));
    addToConfig(...res.data);
  },
});

const loadConfigSelector = selector({
  key: 'loadConfigSelector',
  set: ({ set }) => {
    const config = getFromConfig();
    set(configAtom, config);
    set(activeConfigAtom, Object.keys(config)[0]);
  },
});

const activeConfigSelector = selector({
  key: 'activeConfigSelector',
  get: ({ get }) => {
    const config = get(configAtom);
    const active = get(activeConfigAtom);
    return active ? config[active] : '';
  },
});

const updateConfigSelector = selector({
  key: 'updateConfigSelector',
  set: ({ set, get }, value) => {
    const config = get(configAtom);
    const active = get(activeConfigAtom);
    set(configAtom, { ...config, [active]: JSON.parse(value) });
  },
});

export {
  fetchConfigSelector,
  activeConfigSelector,
  updateConfigSelector,
  loadConfigSelector,
};
