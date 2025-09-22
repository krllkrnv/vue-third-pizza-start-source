<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredientOptions"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <AppDrag :transfer-data="{ ingredient }">
          <span :class="getIngredientClass(ingredient)">
            {{ ingredient.name }}
          </span>
        </AppDrag>

        <div class="counter counter--orange ingredients__counter">
          <button
            type="button"
            class="counter__button counter__button--minus"
            :disabled="getIngredientQuantity(ingredient.id) === 0"
            @click="decreaseIngredient(ingredient)"
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input
            type="text"
            name="counter"
            class="counter__input"
            :value="getIngredientQuantity(ingredient.id)"
            readonly
          />
          <button
            type="button"
            class="counter__button counter__button--plus"
            :disabled="getIngredientQuantity(ingredient.id) >= 3"
            @click="increaseIngredient(ingredient)"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { AppDrag } from "@/common/components";

const props = defineProps({
  ingredientOptions: {
    type: Array,
    required: true,
    default: () => [],
  },
  selectedIngredients: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["ingredient-change"]);

const getIngredientClass = (ingredient) => {
  return `filling filling--${ingredient.image.replace("filling/", "").replace(".svg", "")}`;
};

const getIngredientQuantity = (ingredientId) => {
  return props.selectedIngredients[ingredientId] || 0;
};

const increaseIngredient = (ingredient) => {
  const currentQuantity = getIngredientQuantity(ingredient.id);
  if (currentQuantity < 3) {
    emit("ingredient-change", {
      ingredient,
      quantity: currentQuantity + 1,
    });
  }
};

const decreaseIngredient = (ingredient) => {
  const currentQuantity = getIngredientQuantity(ingredient.id);
  if (currentQuantity > 0) {
    emit("ingredient-change", {
      ingredient,
      quantity: currentQuantity - 1,
    });
  }
};
</script>

<style scoped>
.ingredients__filling {
  width: 100%;
}

.ingredients__filling p {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  margin-top: 0;
  margin-bottom: 16px;
}

.ingredients__list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.filling {
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 16px;
  position: relative;
  padding-left: 36px;
}

.filling::before {
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  width: 32px;
  height: 32px;
  content: "";
  background-position: center;
  background-repeat: no-repeat;
  background-size: 22px;
}

.filling--tomatoes::before {
  background-image: url("@/assets/img/filling/tomatoes.svg");
}

.filling--ananas::before {
  background-image: url("@/assets/img/filling/ananas.svg");
}

.filling--bacon::before {
  background-image: url("@/assets/img/filling/bacon.svg");
}

.filling--blue_cheese::before {
  background-image: url("@/assets/img/filling/blue_cheese.svg");
}

.filling--cheddar::before {
  background-image: url("@/assets/img/filling/cheddar.svg");
}

.filling--chile::before {
  background-image: url("@/assets/img/filling/chile.svg");
}

.filling--ham::before {
  background-image: url("@/assets/img/filling/ham.svg");
}

.filling--jalapeno::before {
  background-image: url("@/assets/img/filling/jalapeno.svg");
}

.filling--mozzarella::before {
  background-image: url("@/assets/img/filling/mozzarella.svg");
}

.filling--mushrooms::before {
  background-image: url("@/assets/img/filling/mushrooms.svg");
}

.filling--olives::before {
  background-image: url("@/assets/img/filling/olives.svg");
}

.filling--onion::before {
  background-image: url("@/assets/img/filling/onion.svg");
}

.filling--parmesan::before {
  background-image: url("@/assets/img/filling/parmesan.svg");
}

.filling--salami::before {
  background-image: url("@/assets/img/filling/salami.svg");
}

.filling--salmon::before {
  background-image: url("@/assets/img/filling/salmon.svg");
}

.counter {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.counter__button {
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.counter__button--minus {
  background-color: #f2eef5;
}

.counter__button--minus::before {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 8px;
  height: 1px;
  content: "";
  background-color: #b3abbc;
}

.counter__button--minus:hover:not(:active):not(:disabled) {
  background-color: #f6ebff;
}

.counter__button--minus:active:not(:disabled) {
  background-color: #ebdcf7;
}

.counter__button--minus:focus:not(:disabled) {
  -webkit-box-shadow: 0 0 0 2px rgba(65, 182, 25, 0.6);
  box-shadow: 0 0 0 2px rgba(65, 182, 25, 0.6);
}

.counter__button--minus:disabled {
  cursor: default;
}

.counter__button--minus:disabled::before {
  opacity: 0.1;
}

.counter__button--plus {
  background-color: #41b619;
}

.counter__button--plus::before {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 8px;
  height: 1px;
  content: "";
  background-color: #ffffff;
}

.counter__button--plus::after {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 1px;
  height: 8px;
  content: "";
  background-color: #ffffff;
}

.counter__button--plus:hover:not(:active):not(:disabled) {
  background-color: #48d618;
}

.counter__button--plus:active:not(:disabled) {
  background-color: #38a413;
}

.counter__button--plus:focus:not(:disabled) {
  -webkit-box-shadow: 0 0 0 2px rgba(65, 182, 25, 0.6);
  box-shadow: 0 0 0 2px rgba(65, 182, 25, 0.6);
}

.counter__button--plus:disabled {
  cursor: default;
  opacity: 0.3;
}

.counter__button--orange {
  background-color: #ff6b00;
}

.counter__button--orange:hover:not(:active):not(:disabled) {
  background-color: #ff842b;
}

.counter__button--orange:active:not(:disabled) {
  background-color: #ed6300;
}

.counter__input {
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 16px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0;
  text-align: center;
  border: none;
  background-color: transparent;
}

.counter__input:focus {
  -webkit-box-shadow: inset 0 0 0 2px rgba(65, 182, 25, 0.6);
  box-shadow: inset 0 0 0 2px rgba(65, 182, 25, 0.6);
}
</style>
