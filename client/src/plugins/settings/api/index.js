import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const fetchDefaultConfig = () => {
  return axios.get(
    `${BASE_URL}/defaultConfig`
  );
};

const fetchModifyConfig = () => {
  return axios.get(
    `${BASE_URL}/modifyConfig`
  );
};

export { fetchDefaultConfig, fetchModifyConfig };
