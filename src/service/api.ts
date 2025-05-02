/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const Api = () => {
  const token = typeof window !== 'undefined' && localStorage.getItem('token');
  if (!token) window.location.href = '/login';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const post = (url: string, data: any) => {
    return axios.post(`http://localhost:5000/api/${url}`, data, { headers });
  };

  const get = (url: string, data: any) => {
    return axios.get(`http://localhost:5000/api/${url}`, data, { headers });
  };

  const put = (url: string, data: any) => {
    return axios.put(`http://localhost:5000/api/${url}`, data, { headers });
  };

  const destroy = (url: string, data: any) => {
    return axios.delete(`http://localhost:5000/api/${url}`, data, { headers });
  };
  return { post, get, put, destroy };
};

export default Api;
