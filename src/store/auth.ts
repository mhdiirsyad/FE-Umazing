import { defineStore } from 'pinia';
import instance from '../lib/axios';
import router from '../router';

interface RegisterForm {
  name: String;
  email: String;
  password: String; 
}

interface LoginForm {
  email: String;
  password: String;
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null,
      isLoggedin: false,
      loading: false,
      error: null,
    }
  },
  actions: {
    async register(payload: RegisterForm) {
      await instance.get('/sanctum/csrf-cookie');
      try {
        const response = await instance.post('/api/register', payload);
        console.log(response);
        router.push({ name: 'dashboard' });
      } catch (error) {
        console.log(error);
      }
    },

    async login(payload: LoginForm) {
      await instance.get('/sanctum/csrf-cookie');
      try {
        const data = await instance.post('/api/login', payload);
        console.log(data);

        router.push({ name: 'dashboard' });
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      try {
        
      } catch (error) {
        
      }
    }
  }
})