import axios from 'axios';

export const callApi = axios.create({
  baseURL: 'http://localhost:5050',
  // baseURL: 'https://greeneries-be.vercel.app',
});
