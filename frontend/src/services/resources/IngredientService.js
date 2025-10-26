import { HttpClient } from "../base/HttpClient.js";
import httpProvider from "../providers/index.js";

const BASE_URL = "/api";

class IngredientService extends HttpClient {
  async getAll() {
    return this.get("/ingredients");
  }

  async getById(id) {
    return this.get(`/ingredients/${id}`);
  }
}

export default new IngredientService({
  httpProvider,
  baseURL: BASE_URL,
});
