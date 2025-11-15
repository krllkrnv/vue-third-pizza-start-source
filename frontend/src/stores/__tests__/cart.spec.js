import { it, describe, beforeEach, expect } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCartStore } from "../cart.js";

describe("cart store", () => {
  let cartStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    cartStore = useCartStore();
  });

  it("should add pizza to cart", () => {
    const pizza = {
      id: 1,
      name: "pizza1",
      price: 500,
      quantity: 1,
    };

    cartStore.addPizza(pizza);

    expect(cartStore.pizzas.length).toBe(1);
    expect(cartStore.pizzas[0].name).toBe("pizza1");
    expect(cartStore.pizzas[0].id).toBe(1);
  });

  it("should remove pizza from cart", () => {
    cartStore.pizzas = [
      { id: 1, name: "pizza1", price: 500, quantity: 1 },
      { id: 2, name: "pizza2", price: 600, quantity: 1 },
    ];

    cartStore.removePizza(1);

    expect(cartStore.pizzas.length).toBe(1);
    expect(cartStore.pizzas.find((pizza) => pizza.id === 1)).toBeUndefined();
    expect(cartStore.pizzas[0].id).toBe(2);
  });

  it("should clear cart", () => {
    cartStore.pizzas = [{ id: 1, name: "pizza1", price: 500, quantity: 1 }];
    cartStore.misc = [{ id: 1, price: 100, quantity: 2 }];

    cartStore.clearCart();

    expect(cartStore.pizzas.length).toBe(0);
    expect(cartStore.misc.length).toBe(0);
    expect(cartStore.isCartEmpty).toBe(true);
  });
});
