import axios from "axios";
import { useState } from "react";
import { SERVER_URL } from "../constant/urls";

const urlMap = {
  loginSuccess: "/auth/loginSuccess",
  tasks: "/v1/allTasks",
};

const requestConfig = {
  loginSuccess: {
    url: urlMap["loginSuccess"],
    method: "get",
    baseURL: SERVER_URL,
    withCredentials: true,
  },
  getAllTasks: {
    url: urlMap["tasks"],
    method: "get",
    baseURL: SERVER_URL,
    withCredentials: true,
  },
};

export const useApi = (name, defaultApiCall = false) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const callApi = () => {
    setLoading(true);
    axios(requestConfig[name])
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  if (defaultApiCall) {
    callApi();
  }
  return { data, loading, callApi };
};
