// import axios from 'axios';
import baseAxios from 'axios';
import { getToken } from './JWT-common';

const axios = baseAxios.create({
  // baseURL: 'https://i6e201.p.ssafy.io:8443', // default URL
  baseURL: 'http://localhost:3000',
  header: {
    Authorization: '',
    'Content-Type': 'application/json',
  },
});

// api와 통신하는 코드를 이곳으로 몰아넣음 (보수성 향상)
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export default axios;