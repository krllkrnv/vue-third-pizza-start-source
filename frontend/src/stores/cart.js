import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [
      {
        id: 1,
        name: "Капричоза",
        size: "30 см",
        dough: "тонком тесте",
        sauce: "томатный",
        ingredients: "грибы, лук, ветчина, пармезан, ананас",
        quantity: 1,
        price: 782,
      },
      {
        id: 2,
        name: "Любимая пицца",
        size: "30 см",
        dough: "тонком тесте",
        sauce: "томатный",
        ingredients: "грибы, лук, ветчина, пармезан, ананас, бекон, блю чиз",
        quantity: 2,
        price: 782,
      },
    ],
    additionalItems: [
      {
        id: 1,
        name: "Coca-Cola 0,5 литра",
        image: "@/assets/img/cola.svg",
        quantity: 2,
        price: 56,
      },
      {
        id: 2,
        name: "Острый соус",
        image: "@/assets/img/sauce.svg",
        quantity: 2,
        price: 30,
      },
      {
        id: 3,
        name: "Картошка из печи",
        image: "@/assets/img/potato.svg",
        quantity: 2,
        price: 56,
      },
    ],
    form: {
      delivery: "pickup",
      phone: "",
      address: {
        street: "",
        house: "",
        apartment: "",
      },
    },
  }),

  getters: {
    totalPrice: (state) => {
      const pizzaTotal = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const additionalTotal = state.additionalItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      return pizzaTotal + additionalTotal;
    },
    cartItemsCount: (state) => {
      return state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
  },

  actions: {
    increaseQuantity(id) {
      const item = this.cartItems.find((item) => item.id === id);
      if (item) item.quantity++;
    },
    decreaseQuantity(id) {
      const item = this.cartItems.find((item) => item.id === id);
      if (item && item.quantity > 1) item.quantity--;
    },
    increaseAdditional(id) {
      const item = this.additionalItems.find((item) => item.id === id);
      if (item) item.quantity++;
    },
    decreaseAdditional(id) {
      const item = this.additionalItems.find((item) => item.id === id);
      if (item && item.quantity > 1) item.quantity--;
    },
    editItem(id) {
      alert(id);
    },
    updateForm(formData) {
      this.form = { ...this.form, ...formData };
    },
    addPizza(pizza) {
      this.cartItems.push(pizza);
    },
    removePizza(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
    },
    addAdditional(additional) {
      this.additionalItems.push(additional);
    },
    removeAdditional(id) {
      this.additionalItems = this.additionalItems.filter((item) => item.id !== id);
    },
    clearCart() {
      this.cartItems = [];
      this.additionalItems = [];
    },
    onSubmit() {
      alert({
        items: this.cartItems,
        additional: this.additionalItems,
        form: this.form,
        total: this.totalPrice,
      });
    },
  },
});
