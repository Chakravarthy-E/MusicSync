import axios, { AxiosInstance } from "axios";

const baseURL = "http://192.168.1.100:8989";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

export const getClient = (token?: string): AxiosInstance => {
  if (!token) return axiosInstance;

  const defaultHeaders = {
    Authorization: "Bearer " + token,
  };

  return axios.create({
    baseURL,
    headers: defaultHeaders,
  });
};

export default axiosInstance;
