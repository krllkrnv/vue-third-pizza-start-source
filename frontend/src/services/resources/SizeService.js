import { HttpClient } from "../base/HttpClient.js";
import httpProvider from "../providers/index.js";

const BASE_URL = "/api";

class SizeService extends HttpClient {
  async getAll() {
    return this.get("/sizes");
  }

  async getById(id) {
    return this.get(`/sizes/${id}`);
  }
}

export default new SizeService({
  httpProvider,
  baseURL: BASE_URL,
});
