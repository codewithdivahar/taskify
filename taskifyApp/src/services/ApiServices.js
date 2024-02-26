import axios, {AxiosRequestConfig} from 'axios';
import {useState} from 'react';
import {SERVER_URL} from '../constants/urls';

const urlMap = {
  logout: '/auth/logout?deviceType=mobile',
  loginSuccess: '/auth/loginSuccess',
  tasks: '/v1/tasks',
};

const requestConfig = {
  logout: () => ({
    url: urlMap['logout'],
    method: 'get',
    baseURL: SERVER_URL,
  }),
  loginSuccess: () => ({
    url: urlMap['loginSuccess'],
    method: 'get',
    baseURL: SERVER_URL,
  }),
  getTasks: () => ({
    url: urlMap['tasks'],
    method: 'get',
    baseURL: SERVER_URL,
  }),
  updateTask: body => ({
    url: urlMap['tasks'],
    method: 'post',
    baseURL: SERVER_URL,
    data: body,
  }),
};

export const useApi = (name, defaultApiCall = false) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const callApi = (body = null) => {
    setLoading(true);
    axios(requestConfig[name](body))
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };
  if (defaultApiCall) {
    callApi();
  }
  return {data, loading, callApi};
};
