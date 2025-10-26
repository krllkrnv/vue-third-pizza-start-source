import { HttpClient } from "../base/HttpClient.js";
import httpProvider from "../providers/index.js";

const BASE_URL = "/api";

class MiscService extends HttpClient {
  async getAll() {
    return this.get("/misc");
  }

  async getById(id) {
    return this.get(`/misc/${id}`);
  }
}

export default new MiscService({
  httpProvider,
  baseURL: BASE_URL,
});
