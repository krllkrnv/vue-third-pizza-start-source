<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <DoughSelector
          :dough-options="pizzaStore.dough"
          :selected-dough-id="pizzaStore.selectedDough?.id"
          @dough-change="onDoughChange"
        />

        <SizeSelector
          :size-options="pizzaStore.sizes"
          :selected-size-id="pizzaStore.selectedSize?.id"
          @size-change="onSizeChange"
        />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <SauceSelector
                :sauce-options="pizzaStore.sauces"
                :selected-sauce-id="pizzaStore.selectedSauce?.id"
                @sauce-change="onSauceChange"
              />

              <IngredientsSelector
                :ingredient-options="pizzaStore.ingredients"
                :selected-ingredients="pizzaStore.selectedIngredients"
                @ingredient-change="onIngredientChange"
              />
            </div>
          </div>
        </div>

        <PizzaDisplay
          :pizza-name="pizzaStore.pizzaName"
          :selected-dough="pizzaStore.selectedDough"
          :selected-size="pizzaStore.selectedSize"
          :selected-sauce="pizzaStore.selectedSauce"
          :selected-ingredients="pizzaStore.selectedIngredients"
          :total-price="pizzaStore.totalPrice"
          @pizza-name-change="onPizzaNameChange"
          @order-click="onOrderClick"
          @ingredient-change="onIngredientChange"
        />
      </div>
    </form>
  </main>
</template>

<script setup>
import { usePizzaStore } from "@/stores";
import { useCartStore } from "@/stores";

import DoughSelector from "@/modules/constructor/DoughSelector.vue";
import SizeSelector from "@/modules/constructor/SizeSelector.vue";
import SauceSelector from "@/modules/constructor/SauceSelector.vue";
import IngredientsSelector from "@/modules/constructor/IngredientsSelector.vue";
import PizzaDisplay from "@/modules/constructor/PizzaDisplay.vue";

const pizzaStore = usePizzaStore();
const cartStore = useCartStore();

const onDoughChange = (doughItem) => {
  pizzaStore.setDough(doughItem);
};

const onSizeChange = (size) => {
  pizzaStore.setSize(size);
};

const onSauceChange = (sauce) => {
  pizzaStore.setSauce(sauce);
};

const onIngredientChange = ({ ingredient, quantity }) => {
  pizzaStore.setIngredient({ ingredient, quantity });
};

const onPizzaNameChange = (name) => {
  pizzaStore.setPizzaName(name);
};

const onOrderClick = () => {
  const pizza = pizzaStore.createPizza();
  cartStore.addPizza(pizza);
  pizzaStore.resetPizza();
};
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
