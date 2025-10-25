import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
    misc: [],
    form: {
      delivery: "pickup",
      phone: "",
      address: {
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
    },
  }),

  getters: {
    totalPrice: (state) => {
      const pizzasTotal = state.pizzas.reduce(
        (sum, pizza) => sum + pizza.price * pizza.quantity,
        0,
      );
      const miscTotal = state.misc.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      return pizzasTotal + miscTotal;
    },
    cartItemsCount: (state) => {
      return state.pizzas.reduce((sum, item) => sum + item.quantity, 0);
    },
    pizzasTotal: (state) => {
      return state.pizzas.reduce(
        (sum, pizza) => sum + pizza.price * pizza.quantity,
        0,
      );
    },
    miscTotal: (state) => {
      return state.misc.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },
    isCartEmpty: (state) => {
      return state.pizzas.length === 0 && state.misc.length === 0;
    },
    hasPizzas: (state) => {
      return state.pizzas.length > 0;
    },
    hasMisc: (state) => {
      return state.misc.length > 0;
    },
  },

  actions: {
    increaseQuantity(id) {
      const item = this.pizzas.find((item) => item.id === id);
      if (item) item.quantity++;
    },
    decreaseQuantity(id) {
      const item = this.pizzas.find((item) => item.id === id);
      if (item && item.quantity > 1) item.quantity--;
    },
    increaseAdditional(id) {
      const item = this.misc.find((item) => item.id === id);
      if (item) item.quantity++;
    },
    decreaseAdditional(id) {
      const item = this.misc.find((item) => item.id === id);
      if (item && item.quantity > 1) item.quantity--;
    },
    editItem(id) {
      alert(id);
    },
    updateForm(formData) {
      this.form = { ...this.form, ...formData };
    },
    addPizza(pizza) {
      this.pizzas.push(pizza);
    },
    removePizza(id) {
      this.pizzas = this.pizzas.filter((item) => item.id !== id);
    },
    addAdditional(additional) {
      this.misc.push(additional);
    },
    removeAdditional(id) {
      this.misc = this.misc.filter((item) => item.id !== id);
    },
    clearCart() {
      this.pizzas = [];
      this.misc = [];
    },
    onSubmit() {
      alert({
        items: this.pizzas,
        additional: this.misc,
        form: this.form,
        total: this.totalPrice,
      });
    },
  },
});
