<template>
  <div class="sign-form">
    <a href="#" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="form.email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            required
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="form.password"
            type="password"
            name="pass"
            placeholder="***********"
            required
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  email: "",
  password: "",
});

const onSubmit = () => {
  alert(form.value);
};
</script>

<style scoped>
.sign-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: block;
  box-sizing: border-box;
  width: 455px;
  padding: 146px 32px 32px;
  background: #fff url("@/assets/img/popup.svg") no-repeat center top;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 0 2px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.04);
}

.sign-form button {
  margin: 0 auto;
  padding: 16px 14px;
}

.sign-form__title {
  margin-bottom: 24px;
  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
  color: #000;
  border-radius: 50%;
  outline: none;
}

.close::before,
.close::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25px;
  height: 2px;
  content: "";
  border-radius: 2px;
  background-color: #000;
}

.close::before {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.close::after {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close:hover {
  opacity: 0.8;
}

.close:active {
  opacity: 0.5;
}

.close:focus::after,
.close:focus::before {
  background-color: #ff842b;
}

.close--white::after,
.close--white::before {
  background-color: #fff;
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

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  color: #000;
}

.title--small {
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  line-height: 21px;
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
