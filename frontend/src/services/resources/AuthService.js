import { HttpClient } from "../base/HttpClient.js";
import httpProvider from "../providers/index.js";

const BASE_URL = "/api";

class AuthService extends HttpClient {
  async login(email, password) {
    return this.post("/login", { email, password });
  }

  async whoAmI() {
    return this.get("/whoAmI");
  }

  async logout() {
    return this.delete("/logout");
  }
}

export default new AuthService({
  httpProvider,
  baseURL: BASE_URL,
});
