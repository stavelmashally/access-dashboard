import axios from 'axios';

const BASE_URL = 'http://localhost:5588/mocking_G/';

const getDefaultConfig = () => {
  return axios.get(
    `${BASE_URL}generate?library=defaultConfig&category=all&amount=1`
  );
};

const getModifyConfig = () => {
  return axios.get(
    `${BASE_URL}generate?library=modifyConfig&category=all&amount=1`
  );
};

export { getDefaultConfig, getModifyConfig };
