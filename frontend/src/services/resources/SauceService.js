import { HttpClient } from "../base/HttpClient.js";
import httpProvider from "../providers/index.js";

const BASE_URL = "/api";

class SauceService extends HttpClient {
  async getAll() {
    return this.get("/sauces");
  }

  async getById(id) {
    return this.get(`/sauces/${id}`);
  }
}

export default new SauceService({
  httpProvider,
  baseURL: BASE_URL,
});
