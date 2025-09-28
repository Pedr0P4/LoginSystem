import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: "https://api.homologation.cliqdrive.com.br/auth",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json;version=v1_web",
  },
});

client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userToken = localStorage.getItem("tokens");

  if (userToken) {
    const token = JSON.parse(userToken);
    config.headers.Authorization = `Bearer ${token.access}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.log("erro de token!");
    }
    return Promise.reject(error);
  },
);

export default client;
