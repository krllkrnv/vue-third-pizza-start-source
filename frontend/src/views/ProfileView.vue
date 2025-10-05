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

      <router-link to="/orders" class="layout__link"
        >История заказов</router-link
      >
      <router-link to="/profile" class="layout__link layout__link--active"
        >Мои данные</router-link
      >
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <div class="user">
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5@2x.webp 1x,
              @/assets/img/users/user5@4x.webp 2x
            "
          />
          <img
            src="@/assets/img/users/user5@2x.jpg"
            srcset="@/assets/img/users/user5@4x.jpg"
            alt="Василий Ложкин"
            width="72"
            height="72"
          />
        </picture>
        <div class="user__name">
          <span>{{ user.name }}</span>
        </div>
        <p class="user__phone">
          Контактный телефон: <span>{{ user.phone }}</span>
        </p>
      </div>

      <div class="layout__address">
        <form
          class="address-form address-form--opened sheet"
          @submit.prevent="saveProfile"
        >
          <div class="address-form__header">
            <b>Личная информация</b>
          </div>

          <div class="address-form__wrapper">
            <div class="address-form__input">
              <label class="input">
                <span>Имя*</span>
                <input
                  v-model="user.name"
                  type="text"
                  name="user-name"
                  placeholder="Введите ваше имя"
                  required
                />
              </label>
            </div>
            <div class="address-form__input">
              <label class="input">
                <span>Телефон*</span>
                <input
                  v-model="user.phone"
                  type="tel"
                  name="user-phone"
                  placeholder="+7 999-999-99-99"
                  required
                />
              </label>
            </div>
            <div class="address-form__input">
              <label class="input">
                <span>Email</span>
                <input
                  v-model="user.email"
                  type="email"
                  name="user-email"
                  placeholder="example@mail.ru"
                />
              </label>
            </div>
          </div>

          <div class="address-form__buttons">
            <button type="submit" class="button">Сохранить изменения</button>
          </div>
        </form>
      </div>

      <div class="layout__address">
        <form
          class="address-form address-form--opened sheet"
          @submit.prevent="changePassword"
        >
          <div class="address-form__header">
            <b>Смена пароля</b>
          </div>

          <div class="address-form__wrapper">
            <div class="address-form__input">
              <label class="input">
                <span>Текущий пароль*</span>
                <input
                  v-model="passwordForm.currentPassword"
                  type="password"
                  name="current-password"
                  placeholder="Введите текущий пароль"
                  required
                />
              </label>
            </div>
            <div class="address-form__input">
              <label class="input">
                <span>Новый пароль*</span>
                <input
                  v-model="passwordForm.newPassword"
                  type="password"
                  name="new-password"
                  placeholder="Введите новый пароль"
                  required
                />
              </label>
            </div>
            <div class="address-form__input">
              <label class="input">
                <span>Подтвердите пароль*</span>
                <input
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  name="confirm-password"
                  placeholder="Подтвердите новый пароль"
                  required
                />
              </label>
            </div>
          </div>

          <div class="address-form__buttons">
            <button type="submit" class="button">Изменить пароль</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";

const user = ref({
  name: "Василий Ложкин",
  phone: "+7 999-999-99-99",
  email: "vasily@example.com",
});

const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const saveProfile = () => {
  alert(user.value);
};

const changePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert("Пароли не совпадают!");
    return;
  }

  alert({
    currentPassword: passwordForm.value.currentPassword,
    newPassword: passwordForm.value.newPassword,
  });

  passwordForm.value = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
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

.layout__button {
  margin-top: 40px;
}

.layout__button button {
  padding: 12px 23px;
}

.layout__address {
  margin-top: 16px;
}

.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 33px;
}

.user__name {
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  line-height: 23px;
  margin-left: 30px;
}

.user__name span {
  display: inline-block;
  vertical-align: middle;
}

.user__button {
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 19px;
  width: 100%;
  margin-top: 20px;
}

.user__phone span {
  font-weight: 400;
}

.address-form {
  position: relative;
  padding-top: 0;
  padding-bottom: 26px;
}

.address-form--opened .address-form__header {
  padding: 16px;
}

.address-form p {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  margin-top: 0;
  margin-bottom: 16px;
  padding: 0 16px;
}

.address-form small {
  font-size: 11px;
  font-weight: 300;
  line-height: 13px;
  display: block;
  padding: 0 16px;
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;
}

.address-form__input--size--normal {
  width: 60.5%;
}

.address-form__input--size--small {
  width: 18%;
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
}

.address-form__buttons button {
  margin-left: 16px;
  padding: 16px 27px;
}

.address-form__header {
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 21px;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(65, 182, 25, 0.1);
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

.button--transparent {
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  line-height: 16px;
  background-color: transparent;
  box-shadow: none;
  color: #000;
}

.button--transparent:hover:not(:active):not(:disabled) {
  color: #e20338;
  background-color: transparent;
}

.button--transparent:active:not(:disabled) {
  color: #c20532;
  background-color: transparent;
}

.button--transparent:disabled {
  opacity: 0.25;
}
</style>
