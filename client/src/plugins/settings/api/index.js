import axios from 'axios';

const BASE_URL = 'http://localhost:5050';

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
