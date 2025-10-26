import { HttpClient } from "../base/HttpClient.js";
import httpProvider from "../providers/index.js";

const BASE_URL = "/api";

class AddressService extends HttpClient {
  async getAll() {
    return this.get("/addresses");
  }

  async getById(id) {
    return this.get(`/addresses/${id}`);
  }

  async create(address) {
    return this.post("/addresses", address);
  }

  async update(id, address) {
    return this.put(`/addresses/${id}`, address);
  }

  async delete(id) {
    return this.delete(`/addresses/${id}`);
  }
}

export default new AddressService({
  httpProvider,
  baseURL: BASE_URL,
});
