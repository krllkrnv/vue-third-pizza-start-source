import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import PizzaDisplay from "../PizzaDisplay.vue";

describe("PizzaDisplay", () => {
  let wrapper;

  const defaultProps = {
    pizzaName: "",
    selectedDough: { id: 1 },
    selectedSize: { id: 1 },
    selectedSauce: { id: 1 },
    selectedIngredients: {},
    ingredients: [],
    totalPrice: 0,
  };

  beforeEach(() => {
    wrapper = mount(PizzaDisplay, {
      props: defaultProps,
    });
  });

  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("have disabled button when pizza name isnt set", () => {
    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("enable button when pizza name and price arent empty", () => {
    wrapper = mount(PizzaDisplay, {
      props: {
        ...defaultProps,
        pizzaName: "pizza1",
        totalPrice: 500,
      },
    });

    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeUndefined();
  });

  it("should display total price", () => {
    wrapper = mount(PizzaDisplay, {
      props: {
        ...defaultProps,
        totalPrice: 500,
      },
    });

    expect(wrapper.text()).toContain("Итого: 500 ₽");
  });
});
