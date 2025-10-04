import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./components/HomeView.vue";
import Register from "./views/auth/Register.vue";
import Login from "./views/auth/Login.vue";
import Admin from "./layouts/admin.vue";
import AdminDashboard from "./views/admin/dashboard.vue";
import Auth from "./layouts/auth.vue";
import { useAuthStore } from "./store/auth";
import Dashboard from "./views/member/Dashboard.vue";
import Member from "./layouts/member.vue";
import Category from "./views/admin/category.vue";
import Product from "./views/admin/product.vue";
import Order from "./views/admin/order.vue";


const routes = [
  {
    path: '/',
    component: () => HomeView,
    name: 'home'
  },
  {
    path: '/auth',
    component: Auth,
    children: [
      {
        path: 'login',
        component: Login,
        name: 'auth.login',
        meta: { title: 'Login' }
      },
      {
        path: 'register',
        component: Register,
        name: 'auth.register',
        meta: { title: 'Register' }
      }
    ]
  },
  {
    path: '/member',
    component: Member,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        name: 'member.dashboard',
        meta: {
          requiresAuth: true,
          title: 'Member Dashboard'
        }
      }
    ]
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboard,
        name: 'admin.dashboard',
        meta: {
          requiresAuth: true,
          title: 'Admin Dashboard'
        }
      },
      {
        path: 'category',
        component: Category,
        name: 'admin.category',
        meta: {
          requiresAuth: true,
          title: 'Admin Category'
        }
      },
      {
        path: 'product',
        component: Product,
        name: 'admin.product',
        meta: {
          requiresAuth: true,
          title: 'Admin Product'
        }
      },
      {
        path: 'order',
        component: Order,
        name: 'admin.order',
        meta: {
          requiresAuth: true,
          title: 'Admin order'
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const {isAuthenticated} = authStore;
  if (to.meta.requiresAuth && !isAuthenticated) {
    if (authStore.token) {
      try {
        await authStore.getMe();
        if (authStore.user) {
          if(authStore.user.role==='admin'){
            next({name: 'admin.dashboard'});
          }else{
            next({name: 'member.dashboard'});
          }
        }
        next();
      } catch (error) {
        next({name: 'auth.login'});
        throw error;
      }
    } else {
      next({name: 'auth.login'});
    }
  } else if (to.meta.requiresUnauth && authStore.token) {
    next({name: 'member.dashboard'});
  } else {
    next();
  }
})

export default router;