/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const BASE_URL = "vonso-final-remidi-backend-production.up.railway.app/api";

const Api = {
  get: (url: string) => {
    const token = localStorage.getItem('token');
    return axios.get(`${BASE_URL}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },

  post: (url: string, data: any) => {
    const token = localStorage.getItem('token');
    return axios.post(`${BASE_URL}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },

  put: (url: string, data: any) => {
    const token = localStorage.getItem('token');
    return axios.put(`${BASE_URL}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },

  delete: (url: string) => {
    const token = localStorage.getItem('token');
    return axios.delete(`${BASE_URL}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default Api;
