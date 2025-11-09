import { defineStore } from "pinia";
import {
  DoughService,
  SizeService,
  IngredientService,
  SauceService,
} from "@/services";
import { getPublicImage } from "@/utils/images.js";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    dough: [],
    sizes: [],
    ingredients: [],
    sauces: [],
    selectedDough: null,
    selectedSize: null,
    selectedSauce: null,
    selectedIngredients: {},
    pizzaName: "",
  }),

  getters: {
    totalPrice: (state) => {
      let basePrice = 0;

      basePrice += state.selectedDough?.price || 0;
      basePrice += state.selectedSauce?.price || 0;

      Object.entries(state.selectedIngredients).forEach(
        ([ingredientId, quantity]) => {
          const ingredient = state.ingredients.find(
            (ing) => ing.id === parseInt(ingredientId),
          );
          if (ingredient) {
            basePrice += ingredient.price * quantity;
          }
        },
      );

      const sizeMultiplier = state.selectedSize?.multiplier || 1;
      return basePrice * sizeMultiplier;
    },
    canOrder: (state) => {
      return state.pizzaName.trim().length > 0 && state.totalPrice > 0;
    },
    visibleIngredients: (state) => {
      const ingredients = [];
      Object.entries(state.selectedIngredients).forEach(
        ([ingredientId, quantity]) => {
          if (quantity > 0) {
            const ingredient = state.ingredients.find(
              (ing) => ing.id === parseInt(ingredientId),
            );
            if (ingredient) {
              ingredients.push({
                ...ingredient,
                quantity,
                cssClass:
                  quantity === 1 ? "" : quantity === 2 ? "second" : "third",
              });
            }
          }
        },
      );
      return ingredients;
    },
  },

  actions: {
    async loadData() {
      try {
        const [dough, sizes, ingredients, sauces] = await Promise.all([
          DoughService.getAll(),
          SizeService.getAll(),
          IngredientService.getAll(),
          SauceService.getAll(),
        ]);

        this.dough = dough.map((item) => ({
          ...item,
          image: getPublicImage(item.image),
        }));

        this.sizes = sizes.map((item) => ({
          ...item,
          image: getPublicImage(item.image),
        }));

        this.ingredients = ingredients.map((item) => ({
          ...item,
          image: getPublicImage(item.image),
        }));

        this.sauces = sauces;

        this.resetPizza();
      } catch (error) {
        console.error("[usePizzaStore] Error loading pizza data:", error);
      }
    },

    setDough(dough) {
      this.selectedDough = dough;
    },
    setSize(size) {
      this.selectedSize = size;
    },
    setSauce(sauce) {
      this.selectedSauce = sauce;
    },
    setPizzaName(name) {
      this.pizzaName = name;
    },
    setIngredient({ ingredient, quantity }) {
      if (quantity === 0) {
        delete this.selectedIngredients[ingredient.id];
      } else {
        this.selectedIngredients[ingredient.id] = quantity;
      }
    },
    addIngredient(ingredient) {
      const currentQuantity = this.selectedIngredients[ingredient.id] || 0;
      if (currentQuantity < 3) {
        this.selectedIngredients[ingredient.id] = currentQuantity + 1;
      }
    },
    removeIngredient(ingredientId) {
      const currentQuantity = this.selectedIngredients[ingredientId] || 0;
      if (currentQuantity > 0) {
        this.selectedIngredients[ingredientId] = currentQuantity - 1;
        if (this.selectedIngredients[ingredientId] === 0) {
          delete this.selectedIngredients[ingredientId];
        }
      }
    },
    clearIngredients() {
      this.selectedIngredients = {};
    },
    resetPizza() {
      this.selectedDough = this.dough[0] || null;
      this.selectedSize = this.sizes[1] || null;
      this.selectedSauce = this.sauces[0] || null;
      this.selectedIngredients = {};
      this.pizzaName = "";
    },
    createPizza() {
      const ingredientsArray = Object.entries(this.selectedIngredients)
        .map(([ingredientId, quantity]) => ({
          ingredientId: parseInt(ingredientId),
          quantity: quantity,
        }))
        .filter(item => item.quantity > 0);

      const ingredientsList = ingredientsArray
        .map(({ ingredientId }) => {
          const ingredient = this.ingredients.find(
            (ing) => ing.id === ingredientId,
          );
          return ingredient ? ingredient.name : "";
        })
        .filter(Boolean)
        .join(", ");

      return {
        id: Date.now(),
        name: this.pizzaName,
        sizeId: this.selectedSize.id,
        doughId: this.selectedDough.id,
        sauceId: this.selectedSauce.id,
        size: this.selectedSize.name,
        dough: this.selectedDough.name.toLowerCase() + " тесте",
        sauce: this.selectedSauce.name.toLowerCase(),
        ingredients: ingredientsArray,
        ingredientsText: ingredientsList,
        price: this.totalPrice,
        quantity: 1,
      };
    },
  },
});