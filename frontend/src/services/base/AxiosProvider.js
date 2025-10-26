import axios from "axios";
import { getToken, removeToken } from "./token-manager.js";

export default class AxiosProvider {
  constructor(options = {}) {
    this.instance = axios.create({
      baseURL: options.baseURL || "",
      timeout: options.timeout || 10000,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          removeToken();
        }
        return Promise.reject(error);
      },
    );
  }

  async get(path, options = {}) {
    const response = await this.instance.get(path, options);
    return response.data;
  }

  async post(path, data, options = {}) {
    const response = await this.instance.post(path, data, options);
    return response.data;
  }

  async put(path, data, options = {}) {
    const response = await this.instance.put(path, data, options);
    return response.data;
  }

  async delete(path, options = {}) {
    const response = await this.instance.delete(path, options);
    return response.data;
  }
}
