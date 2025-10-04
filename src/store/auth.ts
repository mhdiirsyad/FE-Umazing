import { defineStore } from 'pinia';
import instance from '../lib/axios';
import router from '../router';
import Cookies from 'js-cookie';

interface RegisterForm {
  name: String;
  email: String;
  password: String; 
}

interface LoginForm {
  email: String;
  password: String;
}

type User = {
  name: String;
  email: String;
  role?: String;
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null as User | null,
      isLoggedin: false,
      loading: false,
      error: null,
    }
  },
  getters: {
    token: () => Cookies.get('auth_token'),
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async register(payload: RegisterForm) {
      await instance.get('/sanctum/csrf-cookie');
      try {
        const response = await instance.post('/api/register', payload);
        const token = response.data.data.token;

        Cookies.set('auth_token', token);

        router.push({name: 'member.dashboard'});
      } catch (error) {
        console.log(error);
      }
    },

    async login(payload: LoginForm) {
      this.loading = true;
      await instance.get('/sanctum/csrf-cookie');
      try {
        const response = await instance.post('/api/login', payload);
        console.log(response);

        const token = response.data.data.token;
        Cookies.set('auth_token', token);

        console.log(Cookies.get('auth_token'));

        this.user = response.data.data.user;
        console.log(this.user);

        if(this.user?.role === 'admin'){
          router.push({ name: 'admin.dashboard' });
        } else {
          router.push({ name: 'member.dashboard' });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      try {
        await instance.post('/api/logout');
        Cookies.remove('auth_token');
        this.user = null;
        this.isLoggedin = false;
        this.error = null;
        router.push({ name: 'auth.login' });

      } catch (error) {
        console.log(error);
      }
    },

    async getMe() {
      this.loading = true
      try {
        const res = await instance.get('/api/me');
        this.user = res.data.data;
        console.log(this.user);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    }
  }
})