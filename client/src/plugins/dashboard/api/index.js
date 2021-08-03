import axios from 'axios';

export const BASE_URL = 'http://localhost:5050/';

const fetchConfig = endpoint => {
  return axios.get(`${BASE_URL}${endpoint}`);
};

const fetchDefaultConfig = () => {
  return axios.get(`${BASE_URL}defaultConfig`);
};

const fetchModifyConfig = () => {
  return axios.get(`${BASE_URL}modifyConfig`);
};

export { fetchDefaultConfig, fetchModifyConfig, fetchConfig };
