import { defineStore } from "pinia";
import AuthService from "@/services/resources/AuthService.js";
import {
  setToken,
  removeToken,
  getToken,
} from "@/services/base/token-manager.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const response = await AuthService.login(
          credentials.email,
          credentials.password,
        );
        setToken(response.token);
        await this.getMe();
      } catch (error) {
        this.error = error.message || "Login error";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getMe() {
      if (!getToken()) {
        return false;
      }

      try {
        const user = await AuthService.whoAmI();
        this.user = user;
        this.isAuthenticated = true;
        return true;
      } catch (error) {
        this.logout();
        return false;
      }
    },

    async logout() {
      try {
        await AuthService.logout();
      } catch (error) {
        console.error("[useAuthStore] Logout error:", error);
      } finally {
        removeToken();
        this.user = null;
        this.isAuthenticated = false;
        this.error = null;
      }
    },
  },
});
