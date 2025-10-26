import { HttpClient } from "../base/HttpClient.js";
import httpProvider from "../providers/index.js";

const BASE_URL = "/api";

class OrderService extends HttpClient {
  async getAll() {
    return this.get("/orders");
  }

  async getById(id) {
    return this.get(`/orders/${id}`);
  }

  async create(order) {
    return this.post("/orders", order);
  }

  async update(id, order) {
    return this.put(`/orders/${id}`, order);
  }

  async delete(id) {
    return this.delete(`/orders/${id}`);
  }
}

export default new OrderService({
  httpProvider,
  baseURL: BASE_URL,
});
