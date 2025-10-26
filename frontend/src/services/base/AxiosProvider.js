import axios from "axios";

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
        const token = localStorage.getItem("authToken");
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
          localStorage.removeItem("authToken");
        }
        return Promise.reject(error);
      },
    );
  }

  async get(path, options = {}) {
    try {
      const response = await this.instance.get(path, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post(path, data, options = {}) {
    try {
      const response = await this.instance.post(path, data, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put(path, data, options = {}) {
    try {
      const response = await this.instance.put(path, data, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(path, options = {}) {
    try {
      const response = await this.instance.delete(path, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
