import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

export const AxiosPublic = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

AxiosPublic.interceptors.response.use((response) => response.data);
