import { defineStore } from "pinia";
import { MiscService, OrderService } from "@/services";
import { useAuthStore } from "./auth.js";
import { getPublicImage } from "@/utils/images.js";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
    misc: [],
    miscItems: [],
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
    async loadMiscItems() {
      try {
        const miscItems = await MiscService.getAll();
        this.miscItems = miscItems.map((item) => ({
          ...item,
          image: getPublicImage(item.image),
        }));
      } catch (error) {
        console.error("[useCartStore] Error loading misc items:", error);
      }
    },

    async submitOrder() {
      try {
        const authStore = useAuthStore();
        const orderData = {
          userId: authStore.user?.id,
          phone: this.form.phone,
          address: this.form.delivery === "delivery" ? this.form.address : null,
          pizzas: this.pizzas.map((pizza) => ({
            name: pizza.name,
            sauceId: pizza.sauceId,
            doughId: pizza.doughId,
            sizeId: pizza.sizeId,
            quantity: pizza.quantity,
            ingredients: pizza.ingredients || [],
          })),
          misc: this.misc.map((item) => ({
            miscId: item.id,
            quantity: item.quantity,
          })),
        };

        const order = await OrderService.create(orderData);
        this.clearCart();
        return order;
      } catch (error) {
        console.error("[useCartStore] Error creating order:", error);
        throw error;
      }
    },

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
