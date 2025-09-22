<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <DoughSelector
          :dough-options="dough"
          :selected-dough-id="selectedDough.id"
          @dough-change="onDoughChange"
        />

        <SizeSelector
          :size-options="sizes"
          :selected-size-id="selectedSize.id"
          @size-change="onSizeChange"
        />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <SauceSelector
                :sauce-options="sauces"
                :selected-sauce-id="selectedSauce.id"
                @sauce-change="onSauceChange"
              />

              <IngredientsSelector
                :ingredient-options="ingredients"
                :selected-ingredients="selectedIngredients"
                @ingredient-change="onIngredientChange"
              />
            </div>
          </div>
        </div>

        <PizzaDisplay
          :pizza-name="pizzaName"
          :selected-dough="selectedDough"
          :selected-size="selectedSize"
          :selected-sauce="selectedSauce"
          :selected-ingredients="selectedIngredients"
          :total-price="totalPrice"
          @pizza-name-change="onPizzaNameChange"
          @order-click="onOrderClick"
          @ingredient-change="onIngredientChange"
        />
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import doughData from "@/mocks/dough.json";
import sizesData from "@/mocks/sizes.json";
import ingredientsData from "@/mocks/ingredients.json";
import saucesData from "@/mocks/sauces.json";

import DoughSelector from "@/modules/constructor/DoughSelector.vue";
import SizeSelector from "@/modules/constructor/SizeSelector.vue";
import SauceSelector from "@/modules/constructor/SauceSelector.vue";
import IngredientsSelector from "@/modules/constructor/IngredientsSelector.vue";
import PizzaDisplay from "@/modules/constructor/PizzaDisplay.vue";

const dough = doughData;
const sizes = sizesData;
const ingredients = ingredientsData;
const sauces = saucesData;

const selectedDough = ref(dough[0]);
const selectedSize = ref(sizes[1]);
const selectedSauce = ref(sauces[0]);
const selectedIngredients = ref({});
const pizzaName = ref("");

const onDoughChange = (doughItem) => {
  selectedDough.value = doughItem;
};

const onSizeChange = (size) => {
  selectedSize.value = size;
};

const onSauceChange = (sauce) => {
  selectedSauce.value = sauce;
};

const onIngredientChange = ({ ingredient, quantity }) => {
  if (quantity === 0) {
    delete selectedIngredients.value[ingredient.id];
  } else {
    selectedIngredients.value[ingredient.id] = quantity;
  }
};

const onPizzaNameChange = (name) => {
  pizzaName.value = name;
};

const onOrderClick = () => {
  console.log("Заказ:", {
    pizzaName: pizzaName.value,
    dough: selectedDough.value,
    size: selectedSize.value,
    sauce: selectedSauce.value,
    ingredients: selectedIngredients.value,
  });
};

const totalPrice = computed(() => {
  let basePrice = 0;

  basePrice += selectedDough.value?.price || 0;

  basePrice += selectedSauce.value?.price || 0;

  Object.entries(selectedIngredients.value).forEach(
    ([ingredientId, quantity]) => {
      const ingredient = ingredients.find(
        (ing) => ing.id === parseInt(ingredientId),
      );
      if (ingredient) {
        basePrice += ingredient.price * quantity;
      }
    },
  );

  const sizeMultiplier = selectedSize.value?.multiplier || 1;
  return basePrice * sizeMultiplier;
});
</script>

<style scoped>
.content {
  padding-top: 20px;
}

.content__wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.sheet {
  padding-top: 15px;
  border-radius: 8px;
  background-color: #ffffff;
  -webkit-box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 0 2px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.04);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 0 2px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.04);
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-right: 18px;
  padding-bottom: 15px;
  padding-left: 18px;
}

.title {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  color: #000000;
}

.title--big {
  font-size: 36px;
  font-weight: 700;
  font-style: normal;
  line-height: 42px;
}

.title--small {
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  line-height: 21px;
}
</style>
