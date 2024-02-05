import { getFromLocalStorage, Keys } from "./storage";
import axios, { CreateAxiosDefaults } from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

type headers = CreateAxiosDefaults<any>["headers"];

export const getClient = async (headers?: headers) => {
  const token = await getFromLocalStorage(Keys.AUTH_TOKEN);

  if (!token) return axios.create({ baseURL });

  const defaultHeaders = {
    Authorization: "Bearer " + token,
    ...headers,
  };

  return axios.create({ baseURL, headers: defaultHeaders });
};

export default client;
