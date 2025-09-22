<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="pizzaName"
        @input="onPizzaNameChange"
      />
    </label>

    <div class="content__constructor">
      <div :class="pizzaFoundationClass">
        <div class="pizza__wrapper">
          <div
            v-for="(ingredient, index) in visibleIngredients"
            :key="`${ingredient.id}-${index}`"
            :class="`pizza__filling pizza__filling--${getIngredientClass(ingredient)}`"
          ></div>
        </div>
      </div>
    </div>

    <div class="content__result">
      <p>Итого: {{ totalPrice }} ₽</p>
      <button
        type="button"
        class="button"
        :disabled="!canOrder"
        @click="onOrderClick"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ingredientsData from "@/mocks/ingredients.json";

const props = defineProps({
  pizzaName: {
    type: String,
    default: "",
  },
  selectedDough: {
    type: Object,
    default: () => ({}),
  },
  selectedSize: {
    type: Object,
    default: () => ({}),
  },
  selectedSauce: {
    type: Object,
    default: () => ({}),
  },
  selectedIngredients: {
    type: Object,
    default: () => ({}),
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["pizza-name-change", "order-click"]);

const pizzaFoundationClass = computed(() => {
  const sizeClass =
    props.selectedSize?.id === 1
      ? "small"
      : props.selectedSize?.id === 2
        ? "normal"
        : "big";
  const sauceClass = props.selectedSauce?.id === 1 ? "tomato" : "creamy";
  return `pizza pizza--foundation--${sizeClass}-${sauceClass}`;
});

const visibleIngredients = computed(() => {
  const ingredients = [];
  Object.entries(props.selectedIngredients).forEach(
    ([ingredientId, quantity]) => {
      if (quantity > 0) {
        // Находим ингредиент по ID
        const ingredient = findIngredientById(parseInt(ingredientId));
        if (ingredient) {
          // Добавляем ингредиент столько раз, сколько выбрано
          for (let i = 0; i < quantity; i++) {
            ingredients.push(ingredient);
          }
        }
      }
    },
  );
  return ingredients;
});

const canOrder = computed(() => {
  return props.pizzaName.trim().length > 0 && props.totalPrice > 0;
});

const getIngredientClass = (ingredient) => {
  return ingredient.image.replace("filling/", "").replace(".svg", "");
};

const findIngredientById = (id) => {
  return ingredientsData.find((ing) => ing.id === id);
};

const onPizzaNameChange = (event) => {
  emit("pizza-name-change", event.target.value);
};

const onOrderClick = () => {
  emit("order-click");
};
</script>

<style scoped>
.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.content__result {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: 25px;
}

.content__result p {
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
  line-height: 28px;
  margin: 0;
}

.content__result button {
  margin-left: 12px;
  padding: 16px 45px;
}

.input {
  display: block;
}

.input span {
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 16px;
  display: block;
  margin-bottom: 8px;
}

.input input {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  display: block;
  width: 100%;
  margin: 0;
  padding: 8px 12px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #ffffff;
}

.input input:focus {
  border-color: #41b619;
}

.input:hover input {
  border-color: #000000;
}

.button {
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  line-height: 21px;
  font-family: inherit;
  display: inline-block;
  margin: 0;
  padding: 16px 32px;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  background-color: #41b619;
  color: #ffffff;
}

.button:hover:not(:active):not(:disabled) {
  background-color: #48d618;
}

.button:active:not(:disabled) {
  background-color: #38a413;
}

.button:focus:not(:disabled) {
  opacity: 0.5;
}

.button:disabled {
  background-color: #8cb97c;
  color: rgba(255, 255, 255, 0.2);
  cursor: default;
}

.pizza {
  position: relative;
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.pizza--foundation--big-creamy {
  background-image: url("@/assets/img/foundation/big-creamy.svg");
}

.pizza--foundation--big-tomato {
  background-image: url("@/assets/img/foundation/big-tomato.svg");
}

.pizza--foundation--small-creamy {
  background-image: url("@/assets/img/foundation/small-creamy.svg");
}

.pizza--foundation--small-tomato {
  background-image: url("@/assets/img/foundation/small-tomato.svg");
}

.pizza--foundation--normal-creamy {
  background-image: url("@/assets/img/foundation/big-creamy.svg");
}

.pizza--foundation--normal-tomato {
  background-image: url("@/assets/img/foundation/big-tomato.svg");
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.pizza__filling::before,
.pizza__filling::after {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.pizza__filling--tomatoes {
  background-image: url("@/assets/img/filling/tomatoes.svg");
}

.pizza__filling--ananas {
  background-image: url("@/assets/img/filling/ananas.svg");
}

.pizza__filling--bacon {
  background-image: url("@/assets/img/filling/bacon.svg");
}

.pizza__filling--blue_cheese {
  background-image: url("@/assets/img/filling/blue_cheese.svg");
}

.pizza__filling--cheddar {
  background-image: url("@/assets/img/filling/cheddar.svg");
}

.pizza__filling--chile {
  background-image: url("@/assets/img/filling/chile.svg");
}

.pizza__filling--ham {
  background-image: url("@/assets/img/filling/ham.svg");
}

.pizza__filling--jalapeno {
  background-image: url("@/assets/img/filling/jalapeno.svg");
}

.pizza__filling--mozzarella {
  background-image: url("@/assets/img/filling/mozzarella.svg");
}

.pizza__filling--mushrooms {
  background-image: url("@/assets/img/filling/mushrooms.svg");
}

.pizza__filling--olives {
  background-image: url("@/assets/img/filling/olives.svg");
}

.pizza__filling--onion {
  background-image: url("@/assets/img/filling/onion.svg");
}

.pizza__filling--parmesan {
  background-image: url("@/assets/img/filling/parmesan.svg");
}

.pizza__filling--salami {
  background-image: url("@/assets/img/filling/salami.svg");
}

.pizza__filling--salmon {
  background-image: url("@/assets/img/filling/salmon.svg");
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
