import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import CartView from "@/views/CartView.vue";
import UserView from "@/views/UserView.vue";
import ProfileView from "@/views/ProfileView.vue";
import OrdersView from "@/views/OrdersView.vue";
import middleware from "./middleware.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "cart",
          name: "cart",
          component: CartView,
        },
        {
          path: "user",
          name: "user",
          component: UserView,
        },
        {
          path: "profile",
          name: "profile",
          component: ProfileView,
          meta: {
            middlewares: [
              import("@/middlewares/auth.js").then((m) => m.default),
            ],
          },
        },
        {
          path: "orders",
          name: "orders",
          component: OrdersView,
          meta: {
            middlewares: [
              import("@/middlewares/auth.js").then((m) => m.default),
            ],
          },
        },
      ],
    },
    {
      path: "/login",
      component: AuthLayout,
      children: [
        {
          path: "",
          name: "login",
          component: LoginView,
        },
      ],
    },
  ],
});

middleware(router);

export default router;
