<template>
  <form class="layout-form" @submit.prevent="cartStore.onSubmit">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <!-- <div class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div> -->

        <ul class="cart-list sheet">
          <li v-for="item in cartStore.pizzas" :key="item.id" class="cart-list__item">
            <div class="product cart-list__product">
              <img
                src="@/assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="item.name"
              />
              <div class="product__text">
                <h2>{{ item.name }}</h2>
                <ul>
                  <li>{{ item.size }}, на {{ item.dough }}</li>
                  <li>Соус: {{ item.sauce }}</li>
                  <li>Начинка: {{ item.ingredients }}</li>
                </ul>
              </div>
            </div>

            <div class="counter cart-list__counter">
              <button
                type="button"
                class="counter__button counter__button--minus"
                @click="cartStore.decreaseQuantity(item.id)"
              >
                <span class="visually-hidden">Меньше</span>
              </button>
              <input
                type="text"
                name="counter"
                class="counter__input"
                :value="item.quantity"
                readonly
              />
              <button
                type="button"
                class="counter__button counter__button--plus counter__button--orange"
                @click="cartStore.increaseQuantity(item.id)"
              >
                <span class="visually-hidden">Больше</span>
              </button>
            </div>

            <div class="cart-list__price">
              <b>{{ item.price }} ₽</b>
            </div>

            <div class="cart-list__button">
              <button
                type="button"
                class="cart-list__edit"
                @click="cartStore.editItem(item.id)"
              >
                Изменить
              </button>
            </div>
          </li>
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <li
              v-for="additional in cartStore.misc"
              :key="additional.id"
              class="additional-list__item sheet"
            >
              <p class="additional-list__description">
                <img
                  :src="additional.image"
                  width="39"
                  height="60"
                  :alt="additional.name"
                />
                <span>{{ additional.name }}</span>
              </p>

              <div class="additional-list__wrapper">
                <div class="counter additional-list__counter">
                  <button
                    type="button"
                    class="counter__button counter__button--minus"
                    @click="cartStore.decreaseAdditional(additional.id)"
                  >
                    <span class="visually-hidden">Меньше</span>
                  </button>
                  <input
                    type="text"
                    name="counter"
                    class="counter__input"
                    :value="additional.quantity"
                    readonly
                  />
                  <button
                    type="button"
                    class="counter__button counter__button--plus counter__button--orange"
                    @click="cartStore.increaseAdditional(additional.id)"
                  >
                    <span class="visually-hidden">Больше</span>
                  </button>
                </div>

                <div class="additional-list__price">
                  <b>× {{ additional.price }} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>
              <select v-model="delivery" name="delivery" class="select">
                <option value="pickup">Заберу сам</option>
                <option value="new-address">Новый адрес</option>
                <option value="home">Дом</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input
                v-model="phone"
                type="text"
                name="tel"
                placeholder="+7 999-999-99-99"
              />
            </label>

            <div v-if="delivery !== 'pickup'" class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input
                    v-model="street"
                    type="text"
                    name="street"
                    required
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input
                    v-model="house"
                    type="text"
                    name="house"
                    required
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input
                    v-model="apartment"
                    type="text"
                    name="apartment"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <section class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow"
          >Хочу еще одну</router-link
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ cartStore.totalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores";

const cartStore = useCartStore();

const delivery = computed({
  get: () => cartStore.form.delivery,
  set: (value) => cartStore.updateForm({ delivery: value })
});

const phone = computed({
  get: () => cartStore.form.phone,
  set: (value) => cartStore.updateForm({ phone: value })
});

const street = computed({
  get: () => cartStore.form.address.street,
  set: (value) => cartStore.updateForm({ address: { ...cartStore.form.address, street: value } })
});

const house = computed({
  get: () => cartStore.form.address.building,
  set: (value) => cartStore.updateForm({ address: { ...cartStore.form.address, building: value } })
});

const apartment = computed({
  get: () => cartStore.form.address.flat,
  set: (value) => cartStore.updateForm({ address: { ...cartStore.form.address, flat: value } })
});
</script>

<style scoped>
.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.content {
  padding-top: 20px;
}

.container {
  width: 770px;
  margin: 0 auto;
}

.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}

.cart-list {
  margin: 0;
  list-style-type: none;
  padding: 15px 0;
}

.cart-list__item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  border-bottom: 1px solid rgba(65, 182, 25, 0.1);
}

.cart-list__item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.cart-list__product {
  flex-grow: 1;
  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;
  text-align: right;
}

.cart-list__price b {
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 19px;
}

.cart-list__edit {
  font-size: 11px;
  font-weight: 300;
  line-height: 13px;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  outline: none;
  background-color: transparent;
}

.cart-list__edit:hover {
  color: #41b619;
}

.cart-list__edit:active {
  color: #38a413;
}

.cart-list__edit:focus {
  color: #48d618;
}

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;
}

.product__text h2 {
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  line-height: 21px;
  margin-top: 0;
  margin-bottom: 10px;
}

.product__text ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  font-size: 11px;
  font-weight: 300;
  line-height: 13px;
}

.additional-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;
  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
}

.additional-list__item img {
  margin-right: 10px;
  margin-left: 15px;
}

.additional-list__item span {
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  line-height: 16px;
  display: inline;
  width: 100px;
  margin-right: 15px;
}

.additional-list__wrapper {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;
  border-top: 1px solid rgba(65, 182, 25, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 19px;
}

.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;
  margin-right: auto;
}

.cart-form__select span {
  margin-right: 16px;
}

.cart-form__label {
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 19px;
  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;
  margin-bottom: 20px;
  margin-left: 16px;
}

.cart-form__input--small {
  max-width: 120px;
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
  margin-bottom: 4px;
}

.input input {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 8px 16px;
  transition: 0.3s;
  color: #000;
  border: 1px solid #b3abbc;
  border-radius: 8px;
  outline: none;
  background-color: #fff;
  font-family: inherit;
}

.input input:focus {
  border-color: #41b619;
}

.input:hover input {
  border-color: #000;
}

.input--big-label {
  display: flex;
  align-items: center;
}

.input--big-label span {
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 19px;
  margin-right: 16px;
  white-space: nowrap;
}

.select {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  display: block;
  margin: 0;
  padding: 8px 30px 8px 16px;
  cursor: pointer;
  transition: 0.3s;
  color: #000;
  border: 1px solid #b3abbc;
  border-radius: 8px;
  outline: none;
  background-color: #f7f4f4;
  background-image: url("@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;
  font-family: inherit;
  appearance: none;
}

.select:hover {
  border-color: #ff842b;
}

.select:focus {
  border-color: #41b619;
}

.counter {
  display: flex;
  justify-content: space-between;
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
  transition: 0.3s;
  border: 0;
  border-radius: 50%;
  outline: 0;
}

.counter__button--minus {
  background-color: #f2eef5;
}

.counter__button--minus::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 2px;
  content: "";
  border-radius: 2px;
  background-color: #000;
}

.counter__button--minus:hover:not(:active):not(:disabled) {
  background-color: #f6ebff;
}

.counter__button--minus:active:not(:disabled) {
  background-color: #ebdcf7;
}

.counter__button--minus:focus:not(:disabled) {
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

.counter__button--plus::after,
.counter__button--plus::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 2px;
  content: "";
  border-radius: 2px;
  background-color: #fff;
}

.counter__button--plus::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.counter__button--plus:hover:not(:active):not(:disabled) {
  background-color: #48d618;
}

.counter__button--plus:active:not(:disabled) {
  background-color: #38a413;
}

.counter__button--plus:focus:not(:disabled) {
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
  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;
  text-align: center;
  color: #000;
  border: 0;
  border-radius: 10px;
  outline: 0;
  background-color: transparent;
}

.counter__input:focus {
  box-shadow: inset 0 0 0 2px rgba(65, 182, 25, 0.6);
}

.sheet {
  padding-top: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 0 2px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.04);
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  color: #000;
}

.title--big {
  font-size: 36px;
  font-weight: 700;
  font-style: normal;
  line-height: 42px;
}

.footer {
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 25px 2.12%;
  background-color: rgba(65, 182, 25, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;
}

.footer__more a {
  padding-top: 16px;
  padding-bottom: 16px;
}

.footer__text {
  font-size: 11px;
  font-weight: 300;
  line-height: 13px;
  color: rgba(0, 0, 0, 0.5);
}

.footer__price {
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
  line-height: 28px;
  margin-right: 12px;
  margin-left: auto;
}

.footer__submit button {
  padding: 16px 14px;
}

.button {
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  line-height: 21px;
  font-family: inherit;
  display: block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow:
    0 16px 24px rgba(0, 0, 0, 0.06),
    0 2px 6px rgba(0, 0, 0, 0.04),
    0 0 1px rgba(0, 0, 0, 0.04);
  background-color: #41b619;
  text-decoration: none;
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

.button--border {
  background-color: transparent;
  border: 1px solid #41b619;
  color: #000;
  box-shadow: none;
}

.button--border:hover:not(:active):not(:disabled) {
  color: #41b619;
  border-color: #41b619;
  background-color: transparent;
}

.button--border:active:not(:disabled) {
  color: #38a413;
  border-color: #38a413;
  background-color: transparent;
}

.button--border:disabled {
  opacity: 0.5;
}

.button--arrow::before {
  content: "";
  background-image: url("@/assets/img/button-arrow.svg");
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 16px;
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  transform: translateY(-1px);
}

.visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  white-space: nowrap;
  border: 0;
  clip-path: inset(100%);
}
</style>
