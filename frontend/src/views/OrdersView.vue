<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <router-link to="/" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>

      <router-link to="/orders" class="layout__link layout__link--active"
        >История заказов</router-link
      >
      <router-link to="/user" class="layout__link">Мои данные</router-link>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>

      <section v-for="order in orders" :key="order.id" class="sheet order">
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.number }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: {{ order.total }} ₽</span>
          </div>

          <div class="order__button">
            <button
              type="button"
              class="button button--border"
              @click="deleteOrder(order.id)"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button type="button" class="button" @click="repeatOrder(order.id)">
              Повторить
            </button>
          </div>
        </div>

        <ul class="order__list">
          <li v-for="item in order.items" :key="item.id" class="order__item">
            <div class="product">
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

            <p class="order__price">
              {{ item.quantity > 1 ? `${item.quantity}×` : ""
              }}{{ item.price }} ₽
            </p>
          </li>
        </ul>

        <ul
          v-if="order.additional && order.additional.length > 0"
          class="order__additional"
        >
          <li v-for="additional in order.additional" :key="additional.id">
            <img
              :src="additional.image"
              width="20"
              height="30"
              :alt="additional.name"
            />
            <p>
              <span>{{ additional.name }}</span>
              <b>{{ additional.price }} ₽</b>
            </p>
          </li>
        </ul>

        <p class="order__address">
          Адрес доставки: {{ order.deliveryAddress }}
        </p>
      </section>

      <div v-if="orders.length === 0" class="sheet order">
        <p style="text-align: center; padding: 40px">У вас пока нет заказов</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "@/stores";

const dataStore = useDataStore();

const orders = computed(() => dataStore.orders);

const deleteOrder = (id) => {
  dataStore.deleteOrder(id);
};

const repeatOrder = (id) => {
  dataStore.repeatOrder(id);
};
</script>

<style scoped>
.layout__sidebar {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 180px;
  height: 100%;
  background-color: rgba(65, 182, 25, 0.05);
}

.layout__logo {
  display: block;
  margin-bottom: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #41b619;
}

.layout__logo img {
  display: block;
  margin: 0 auto;
}

.layout__link {
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  line-height: 16px;
  display: block;
  padding: 8px 14px;
  transition: 0.3s;
  color: #000;
  text-decoration: none;
}

.layout__link--active {
  background-color: rgba(65, 182, 25, 0.1);
}

.layout__link:hover {
  background-color: rgba(65, 182, 25, 0.2);
}

.layout__link:active {
  color: rgba(0, 0, 0, 0.5);
}

.layout__content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}

.layout__title {
  margin-bottom: 27px;
}

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;
  padding: 6px 16px;
  border-bottom: 1px solid rgba(65, 182, 25, 0.1);
}

.order__wrapper b {
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  line-height: 16px;
}

.order__wrapper span {
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  line-height: 16px;
}

.order__wrapper button {
  padding: 8px 26px;
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;
  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 19px;
  margin: 0;
  white-space: nowrap;
}

.order__additional {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 5px;
  padding-left: 80px;
}

.order__additional li {
  font-size: 11px;
  font-weight: 700;
  font-style: normal;
  line-height: 16px;
  width: 130px;
  margin-right: 24px;
  margin-bottom: 10px;
}

.order__additional p {
  margin: 0;
}

.order__additional img {
  float: left;
  margin-right: 7px;
}

.order__additional b {
  display: block;
}

.order__address {
  font-size: 11px;
  font-weight: 300;
  line-height: 13px;
  margin: 0;
  padding: 16px 10px;
  border-top: 1px solid rgba(65, 182, 25, 0.1);
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
</style>
