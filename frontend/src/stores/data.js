import { defineStore } from "pinia";
import { OrderService } from "@/services";

export const useDataStore = defineStore("data", {
  state: () => ({
    orders: [],
    notifications: [],
  }),

  getters: {
    ordersCount: (state) => state.orders.length,
    recentOrders: (state) => state.orders.slice(0, 5),
  },

  actions: {
    async loadOrders() {
      try {
        const orders = await OrderService.getAll();
        this.orders = orders;
      } catch (error) {
        console.error("[useDataStore] Error loading orders:", error);
      }
    },

    async deleteOrder(id) {
      try {
        await OrderService.delete(id);
        const index = this.orders.findIndex((order) => order.id === id);
        if (index > -1) {
          this.orders.splice(index, 1);
        }
      } catch (error) {
        console.error("[useDataStore] Error deleting order:", error);
      }
    },

    repeatOrder(id) {
      const order = this.orders.find((order) => order.id === id);
      if (order) {
        console.log("[useDataStore] Repeat order:", order);
        // TODO: Implement repeat order functionality
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
