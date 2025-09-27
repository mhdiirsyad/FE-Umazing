import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./components/HomeView.vue";
import Register from "./views/auth/Register.vue";
import Login from "./views/auth/Login.vue";
import Dashboard from "./views/auth/Dashboard.vue";

const routes = [
  {
    path: '/',
    component: () => HomeView,
    name: 'home'
  }, {
    path: '/register',
    component: () => Register,
    name: 'register',
  }, {
    path: '/login',
    component: () => Login,
    name: 'login',
  }, {
    path: '/dashboard',
    component: () => Dashboard,
    name: 'dashboard',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router;