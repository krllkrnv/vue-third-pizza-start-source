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

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

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

.dough__input {
  position: relative;
  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;
  cursor: pointer;
}
.dough__input b {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
}
.dough__input b::before {
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  width: 36px;
  height: 36px;
  content: "";
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 50%;
  background-color: #f2eef5;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 22px;
}
.dough__input span {
  font-size: 11px;
  font-weight: 300;
  font-style: normal;
  line-height: 13px;
  display: block;
}
.dough__input--light b::before {
  background-image: url("@/assets/img/dough-light.svg");
}
.dough__input--large b::before {
  background-image: url("@/assets/img/dough-large.svg");
}
.dough__input:hover b::before {
  -webkit-box-shadow: 0 0 0 2px rgba(65, 182, 25, 0.6);
  box-shadow: 0 0 0 2px rgba(65, 182, 25, 0.6);
}
.dough__input input:checked + b::before {
  -webkit-box-shadow: 0 0 0 2px #41b619;
  box-shadow: 0 0 0 2px #41b619;
}

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;
  cursor: pointer;
}
.diameter__input span {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  position: relative;
  padding-left: 46px;
}
.diameter__input span::before {
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  width: 36px;
  height: 36px;
  content: "";
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 50%;
  background-color: #f2eef5;
  background-image: url("@/assets/img/diameter.svg");
  background-position: center;
  background-repeat: no-repeat;
}
.diameter__input:nth-child(3n) {
  margin-right: 0;
}
.diameter__input--small span::before {
  background-size: 18px;
}
.diameter__input--normal span::before {
  background-size: 29px;
}
.diameter__input--big span::before {
  background-size: 100%;
}
.diameter__input:hover span::before {
  -webkit-box-shadow: 0 0 0 2px rgba(65, 182, 25, 0.6);
  box-shadow: 0 0 0 2px rgba(65, 182, 25, 0.6);
}
.diameter__input input:checked + span::before {
  -webkit-box-shadow: 0 0 0 2px #41b619;
  box-shadow: 0 0 0 2px #41b619;
}

.ingredients__sauce {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 14px;
}
.ingredients__sauce p {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  margin-top: 0;
  margin-right: 16px;
  margin-bottom: 10px;
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

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

.radio {
  cursor: pointer;
}
.radio span {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  position: relative;
  padding-left: 24px;
}
.radio span:before {
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  width: 16px;
  height: 16px;
  content: "";
  border: 2px solid #b3abbc;
  border-radius: 50%;
  background-color: #ffffff;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.radio:hover input:not(:checked):not(:disabled) + span:before {
  border-color: #685879;
}
.radio input {
  display: none;
}
.radio input:checked + span:before {
  border: 6px solid #41b619;
}
.radio input:disabled + span:before {
  border-color: #b3abbc;
  background-color: #eaeaea;
}
.radio input:disabled:checked + span:before {
  border: 6px solid #b3abbc;
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
  background-image: url("../assets/img/filling/tomatoes.svg");
}
.filling--ananas::before {
  background-image: url("../assets/img/filling/ananas.svg");
}
.filling--bacon::before {
  background-image: url("../assets/img/filling/bacon.svg");
}
.filling--blue_cheese::before {
  background-image: url("../assets/img/filling/blue_cheese.svg");
}
.filling--cheddar::before {
  background-image: url("../assets/img/filling/cheddar.svg");
}
.filling--chile::before {
  background-image: url("../assets/img/filling/chile.svg");
}
.filling--ham::before {
  background-image: url("../assets/img/filling/ham.svg");
}
.filling--jalapeno::before {
  background-image: url("../assets/img/filling/jalapeno.svg");
}
.filling--mozzarella::before {
  background-image: url("../assets/img/filling/mozzarella.svg");
}
.filling--mushrooms::before {
  background-image: url("../assets/img/filling/mushrooms.svg");
}
.filling--olives::before {
  background-image: url("../assets/img/filling/olives.svg");
}
.filling--onion::before {
  background-image: url("../assets/img/filling/onion.svg");
}
.filling--parmesan::before {
  background-image: url("../assets/img/filling/parmesan.svg");
}
.filling--salami::before {
  background-image: url("../assets/img/filling/salami.svg");
}
.filling--salmon::before {
  background-image: url("../assets/img/filling/salmon.svg");
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
  border: 1px solid #b3abbc;
  border-radius: 4px;
  background-color: #ffffff;
  -webkit-transition: 0.3s;
  transition: 0.3s;
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
  background-image: url("../assets/img/foundation/big-creamy.svg");
}
.pizza--foundation--big-tomato {
  background-image: url("../assets/img/foundation/big-tomato.svg");
}
.pizza--foundation--small-creamy {
  background-image: url("../assets/img/foundation/small-creamy.svg");
}
.pizza--foundation--small-tomato {
  background-image: url("../assets/img/foundation/small-tomato.svg");
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

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
