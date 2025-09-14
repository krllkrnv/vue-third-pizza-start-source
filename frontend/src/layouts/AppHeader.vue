<template>
  <header class="header">
    <div class="header__logo">
      <a href="index.html" class="logo">
        <img
          src="img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a href="cart.html">0 ₽</a>
    </div>
    <div class="header__user">
      <a href="#" class="header__login"><span>Войти</span></a>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  z-index: 2;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0 2.12%;
  background-color: #41b619;
  -webkit-box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 0 2px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.04);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 0 2px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.04);
}

.header__logo {
  padding-top: 10px;
  padding-bottom: 10px;
}

.header__cart {
  margin-right: 10px;
  margin-left: auto;
}
.header__cart a {
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 19px;
  display: block;
  padding-top: 21px;
  padding-right: 15px;
  padding-bottom: 21px;
  padding-left: 58px;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  text-decoration: none;
  color: #ffffff;
  background: url("../assets/img/cart.svg") no-repeat 15px center;
  background-size: auto 50%;
}
.header__cart a:hover:not(:active) {
  background-color: #48d618;
}
.header__cart a:active {
  background-color: #38a413;
}
.header__cart a:focus {
  opacity: 0.5;
}

.header__user {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.header__user a {
  display: block;
  padding-top: 14px;
  padding-right: 20px;
  padding-bottom: 14px;
  padding-left: 20px;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  background-color: #41b619;
  text-decoration: none;
}
.header__user a:hover:not(:active) {
  background-color: #48d618;
}
.header__user a:active {
  background-color: #38a413;
}
.header__user a:focus {
  opacity: 0.5;
}
.header__user img {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  vertical-align: middle;
  border-radius: 50%;
}
.header__user span {
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 16px;
  display: inline-block;
  vertical-align: middle;
  color: #ffffff;
}

.header__logout::before {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  content: "";
  vertical-align: middle;
  background: url("../assets/img/login.svg") no-repeat center;
  background-size: auto 50%;
}

.header__login::after {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-left: 8px;
  content: "";
  vertical-align: middle;
  background: url("../assets/img/login.svg") no-repeat center;
  background-size: auto 50%;
}

.logo {
  display: block;
}
.logo img {
  display: block;
  width: 90px;
  height: 40px;
}
</style>
