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
      return 0;
    },
    cartItemsCount: (state) => {
      return state.pizzas.reduce((sum, item) => sum + item.quantity, 0);
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
