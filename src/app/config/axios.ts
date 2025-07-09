import axios from 'axios';

export const callApi = axios.create({
  baseURL: 'https://greeneries-be.vercel.app',
});
