/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const BASE_URL = 'https://vonso-final-remidi-backend-production-7512.up.railway.app/api';

const Api = {
  get: (url: string) => {
    const token = localStorage.getItem('token');
    return axios.get(`${BASE_URL}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  },

  post: (url: string, data: any) => {
    const token = localStorage.getItem('token');
    return axios.post(`${BASE_URL}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  },

  put: (url: string, data: any) => {
    const token = localStorage.getItem('token');
    return axios.put(`${BASE_URL}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  },

  delete: (url: string) => {
    const token = localStorage.getItem('token');
    return axios.delete(`${BASE_URL}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  },
};

export default Api;
