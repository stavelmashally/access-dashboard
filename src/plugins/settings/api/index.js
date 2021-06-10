import axios from 'axios';

const BASE_URL = 'http://localhost:5050';

const getDefaultConfig = () => {
  return axios.get(
    `${BASE_URL}/defaultConfig`
  );
};

const getModifyConfig = () => {
  return axios.get(
    `${BASE_URL}/modifyConfig`
  );
};

export { getDefaultConfig, getModifyConfig };
