import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => ({
    orders: [
      {
        id: 1,
        number: "11199929",
        total: 1564,
        deliveryAddress: "Тест (или если адрес новый - писать целиком)",
        items: [
          {
            id: 1,
            name: "Капричоза",
            size: "30 см",
            dough: "тонком тесте",
            sauce: "томатный",
            ingredients:
              "грибы, лук, ветчина, пармезан, ананас, бекон, блю чиз",
            quantity: 1,
            price: 782,
          },
          {
            id: 2,
            name: "Моя любимая",
            size: "30 см",
            dough: "тонком тесте",
            sauce: "томатный",
            ingredients: "грибы, лук, ветчина, пармезан, ананас",
            quantity: 2,
            price: 782,
          },
        ],
        additional: [
          {
            id: 1,
            name: "Coca-Cola 0,5 литра",
            image: "@/assets/img/cola.svg",
            price: 56,
          },
          {
            id: 2,
            name: "Острый соус",
            image: "@/assets/img/sauce.svg",
            price: 30,
          },
          {
            id: 3,
            name: "Картошка из печи",
            image: "@/assets/img/potato.svg",
            price: 170,
          },
        ],
      },
      {
        id: 2,
        number: "11199930",
        total: 1564,
        deliveryAddress: "Невский пр., д. 22, кв. 46",
        items: [
          {
            id: 3,
            name: "Капричоза",
            size: "30 см",
            dough: "тонком тесте",
            sauce: "томатный",
            ingredients: "грибы, лук, ветчина, пармезан, ананас",
            quantity: 1,
            price: 782,
          },
          {
            id: 4,
            name: "Моя любимая",
            size: "30 см",
            dough: "тонком тесте",
            sauce: "томатный",
            ingredients: "грибы, лук, ветчина, пармезан, ананас",
            quantity: 2,
            price: 782,
          },
        ],
        additional: [
          {
            id: 4,
            name: "Coca-Cola 0,5 литра",
            image: "@/assets/img/cola.svg",
            price: 56,
          },
          {
            id: 5,
            name: "Острый соус",
            image: "@/assets/img/sauce.svg",
            price: 30,
          },
          {
            id: 6,
            name: "Картошка из печи",
            image: "@/assets/img/potato.svg",
            price: 170,
          },
        ],
      },
    ],
    isAuthenticated: false,
    currentUser: null,
    loading: false,
    error: null,
    notifications: [],
  }),

  getters: {
    hasOrders: (state) => state.orders.length > 0,
    isLoggedIn: (state) => state.isAuthenticated,
    hasError: (state) => state.error !== null,
    hasNotifications: (state) => state.notifications.length > 0,
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
        name: "Василий Ложкин",
        email: credentials.email,
        phone: "+7 999-999-99-99",
      };
      this.loading = false;
    },
    logout() {
      this.isAuthenticated = false;
      this.currentUser = null;
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
