import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "./layouts/AuthLayout.vue";
import Register from "./views/auth/Register.vue";
import Login from "./views/auth/Login.vue";
import AdminLayout from "./layouts/AdminLayout.vue";
import AdminDashboard from "./views/admin/AdminDashboard.vue";
import AdminCategory from "./views/admin/AdminCategory.vue";
import AdminProduct from "./views/admin/AdminProduct.vue";
import AdminOrder from "./views/admin/AdminOrder.vue";
import AdminOrderDetail from "./views/admin/AdminOrderDetail.vue";
import MemberLayout from "./layouts/MemberLayout.vue";
import MemberOrder from "./views/member/MemberOrder.vue";
import MemberOrderDetail from "./views/member/MemberOrderDetail.vue";
import MemberDashboard from "./views/member/MemberDashboard.vue";
import MemberProductDetail from "./views/member/MemberProductDetail.vue";
import MemberCart from "./views/member/MemberCart.vue";
import HomePage from "./views/Guest/HomePage.vue";
import ProductDetail from "./views/Guest/ProductDetail.vue";
import { useAuthStore } from "./store/auth";


const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'home',
    meta: {requiresUnauth: true},
  },
  {
    path: '/product/:id',
    component: ProductDetail,
    name: 'product.detail',
    meta: {requiresUnauth: true},
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: Login,
        name: 'auth.login',
        meta: { title: 'Login', requiresUnauth: true }
      },
      {
        path: 'register',
        component: Register,
        name: 'auth.register',
        meta: { title: 'Register', requiresUnauth: true }
      }
    ]
  },
  {
    path: '/member',
    component: MemberLayout,
    children: [
      {
        path: 'dashboard',
        component: MemberDashboard,
        name: 'member.dashboard',
        meta: {
          requiresAuth: true,
          title: 'Member Dashboard',
          roles: ['user'],
        }
      },
      {
        path: 'product/:id',
        component: MemberProductDetail,
        name: 'member.productDetail',
        meta: {
          requiresAuth: true,
          title: 'Product Detail',
          roles: ['user'],
        }
      },
      {
        path: 'cart',
        component: MemberCart,
        name: 'member.cart',
        meta: {
          requiresAuth: true,
          title: 'Member cart',
          roles: ['user'],
        }
      },
      {
        path: 'order',
        component: MemberOrder,
        name: 'member.order',
        meta: {
          requiresAuth: true,
          title: 'Member Order',
          roles: ['user'],
        }
      },
      {
        path: 'order/:id',
        component: MemberOrderDetail,
        name: 'member.orderDetail', 
        meta: {
          requiresAuth: true,
          title: 'Order Detail',
          roles: ['user'],
        }
      },
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboard,
        name: 'admin.dashboard',
        meta: {
          requiresAuth: true,
          title: 'Admin Dashboard',
          roles: ['admin'],
        }
      },
      {
        path: 'category',
        component: AdminCategory,
        name: 'admin.category',
        meta: {
          requiresAuth: true,
          title: 'Admin Category',
          roles: ['admin'],
        }
      },
      {
        path: 'product',
        component: AdminProduct,
        name: 'admin.product',
        meta: {
          requiresAuth: true,
          title: 'Admin Product',
          roles: ['admin'],
        }
      },
      {
        path: 'order',
        component: AdminOrder,
        name: 'admin.order',
        meta: {
          requiresAuth: true,
          title: 'Admin order',
          roles: ['admin'],
        }
      },
      {
        path: 'order/:id',
        component: AdminOrderDetail,
        name: 'admin.orderDetail',
        meta: {
          requiresAuth: true,
          title: 'Admin order',
          roles: ['admin'],
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
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    if (authStore.token) {
      try {
        await authStore.getMe();
        next();
      } catch (error) {
        next({ name: 'auth.login' });
        return;
      }
    } else {
      next({ name: 'auth.login' });
    }
  } else if (to.meta.requiresUnauth && !!authStore.token) {
    if(!authStore.isAuthenticated){
      try{
        await authStore.getMe();
      }catch(error) {
        return next();
      }
    }
    if (authStore.isAdmin) {
      next({name: 'admin.dashboard'});
      return;
    } else if (authStore.isUser) {
      next({name: 'member.dashboard'});
      return;
    } else {
      next({ name: 'auth.login' });
      return;
    }
  } else {
    next();
  }
});

export default router;