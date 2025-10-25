import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => ({
    orders: [],
    isAuthenticated: false,
    currentUser: {
      id: null,
      name: "",
      email: "",
      avatar: "",
      phone: "",
    },
    loading: false,
    error: null,
    notifications: [],
  }),

  getters: {
    hasOrders: (state) => state.orders.length > 0,
    isLoggedIn: (state) => state.isAuthenticated,
    hasError: (state) => state.error !== null,
    hasNotifications: (state) => state.notifications.length > 0,
    ordersCount: (state) => state.orders.length,
    recentOrders: (state) => state.orders.slice(0, 5),
    userDisplayName: (state) => {
      return state.currentUser.name || "Пользователь";
    },
    isLoading: (state) => state.loading,
  },

  actions: {
    loadOrders() {
      this.loading = true;
      this.loading = false;
    },
    deleteOrder(id) {
      const index = this.orders.findIndex((order) => order.id === id);
      if (index > -1) {
        this.orders.splice(index, 1);
      }
    },
    repeatOrder(id) {
      const order = this.orders.find((order) => order.id === id);
      if (order) {
        console.log("Повтор заказа:", order);
      }
    },
    addOrder(orderData) {
      const newOrder = {
        id: Date.now(),
        number: Math.random().toString(36).substr(2, 8),
        ...orderData,
      };
      this.orders.unshift(newOrder);
    },

    login(credentials) {
      this.loading = true;
      this.isAuthenticated = true;
      this.currentUser = {
        id: null,
        name: "",
        email: credentials.email,
        avatar: "",
        phone: "",
      };
      this.loading = false;
    },
    logout() {
      this.isAuthenticated = false;
      this.currentUser = {
        id: null,
        name: "",
        email: "",
        avatar: "",
        phone: "",
      };
    },
    checkAuth() {},

    setLoading(loading) {
      this.loading = loading;
    },
    setError(error) {
      this.error = error;
    },
    clearError() {
      this.error = null;
    },
    addNotification(notification) {
      this.notifications.push({
        id: Date.now(),
        type: "info",
        message: notification.message,
        ...notification,
      });
    },
    removeNotification(id) {
      const index = this.notifications.findIndex((n) => n.id === id);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    },
    clearNotifications() {
      this.notifications = [];
    },
  },
});
