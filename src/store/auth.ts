import { defineStore } from 'pinia';
import instance from '../lib/axios';
import router from '../router';
import Cookies from 'js-cookie';
import type { LoginForm, RegisterForm } from '../types/type';
import axios from 'axios';
import { nextTick } from 'vue';

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
      errors: null as Record<string, string[]> | string | null,
      flashMessage: {message: '', status: ''} as {message: string, status: string}
    }
  },
  getters: {
    token: () => Cookies.get('auth_token'),
    isAdmin: (state) => state.user?.role === 'admin',
    isUser: (state) => state.user?.role !== 'admin',
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async register(payload: RegisterForm) {
      this.loading = true;
      this.errors = null;
      await instance.get('/sanctum/csrf-cookie');
      try {
        const response = await instance.post('/api/register', payload);
        const token = response.data.data.token;

        Cookies.set('auth_token', token);
        this.user = response.data.data.user
        this.flashMessage = {message: `Welcome, ${this.user?.name}`, status: 'success'};

        router.push({name: 'member.dashboard'});
        return true;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const data = error.response.data;

          if(status===422) {
            this.errors = data.errors;
            throw new Error('Validation error');
          }else if(status===500){
            this.errors = data.message || `Error ${status} : Failed connect to server`;
            throw new Error(this.errors as string);
          }
        } else {
          this.errors = 'Error occured'
          throw error;
        }
      } finally {
        this.loading = false
      }
    },

    async login(payload: LoginForm) {
      this.loading = true;
      await instance.get('/sanctum/csrf-cookie');
      try {
        const response = await instance.post('/api/login', payload);

        const token = response.data.data.token;
        Cookies.set('auth_token', token);

        this.user = response.data.data.user;
        this.flashMessage = {message: `Welcome, ${this.user?.name}`, status: 'success'};

        if(this.user?.role === 'admin'){
          router.push({ name: 'admin.dashboard' });
        } else {
          router.push({ name: 'member.dashboard' });
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const data = error.response.data;

          if(status===422) {
            this.errors = data.errors;
            throw new Error('Validation error');
          }else if(status===500){
            this.errors = data.message || `Error ${status} : Failed connect to server`;
            throw new Error(this.errors as string);
          }else if(status===401 || status===404){
            this.errors = 'Incorrect Email or password';
            throw new Error(this.errors as string);
          }
        } else {
          this.errors = 'Error occured'
          throw error;
        }
        console.log(error);
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true;
      this.errors = null;
      try {
        await instance.post('/api/logout');
        Cookies.remove('auth_token');
        this.user = null;
        this.isLoggedin = false;
        this.errors = null;

        await nextTick();
        this.flashMessage = {message: 'Logout success', status: 'success'};
        router.push({ name: 'auth.login' });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const data = error.response.data;

          if(status===500){
            this.errors = data.message || `Error ${status} : Failed connect to server`;
            throw new Error(this.errors as string);
          }
        } else {
          this.errors = 'Error occured'
          throw error;
        }
      } finally {
        this.loading = false
      }
    },

    async getMe() {
      this.loading = true
      try {
        const res = await instance.get('/api/me');
        this.user = res.data.data;
        console.log(this.user);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const data = error.response.data;

          if(status===500){
            this.errors = data.message || `Error ${status} : Failed connect to server`;
            throw new Error(this.errors as string);
          }
        } else {
          this.errors = 'Error occured'
          throw error;
        }
      } finally {
        this.loading = false;
      }
    },

    clearFlashMessage() {
      this.flashMessage = {message: '', status: ''}
    }
  }
})