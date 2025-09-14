<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="doughItem in dough"
                :key="doughItem.id"
                :class="`dough__input dough__input--${doughItem.id === 1 ? 'light' : 'large'}`"
              >
                <input
                  type="radio"
                  name="dought"
                  :value="doughItem.id === 1 ? 'light' : 'large'"
                  class="visually-hidden"
                  :checked="doughItem.id === 1"
                />
                <b>{{ doughItem.name }}</b>
                <span>{{ doughItem.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="size in sizes"
                :key="size.id"
                :class="`diameter__input diameter__input--${size.id === 1 ? 'small' : size.id === 2 ? 'normal' : 'big'}`"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="
                    size.id === 1 ? 'small' : size.id === 2 ? 'normal' : 'big'
                  "
                  class="visually-hidden"
                  :checked="size.id === 2"
                />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="sauce in sauces"
                  :key="sauce.id"
                  class="radio ingredients__input"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="sauce.id === 1 ? 'tomato' : 'creamy'"
                    :checked="sauce.id === 1"
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    v-for="ingredient in ingredients"
                    :key="ingredient.id"
                    class="ingredients__item"
                  >
                    <span :class="getIngredientClass(ingredient)">
                      {{ ingredient.name }}
                    </span>

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import doughData from "@/mocks/dough.json";
import sizesData from "@/mocks/sizes.json";
import ingredientsData from "@/mocks/ingredients.json";
import saucesData from "@/mocks/sauces.json";

export default {
  name: "HomeView",
  data() {
    return {
      dough: doughData,
      sizes: sizesData,
      ingredients: ingredientsData,
      sauces: saucesData,
    };
  },
  methods: {
    getIngredientClass(ingredient) {
      return `filling filling--${ingredient.image.replace("filling/", "").replace(".svg", "")}`;
    },
  },
};
</script>
