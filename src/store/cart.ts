import { defineStore } from "pinia";
import instance from "../lib/axios";
import Cookies from "js-cookie";
import type { Cart, CartForm } from "../types/type";
import axios from "axios";

export const useCartStore = defineStore('cart', {
  state() {
    return {
      cart: null as Cart | null,
      loading: false,
      errors: null as Record<string, string[]> | string | null,
      flashMessage: {message: '', status: ''} as {message: string, status: string}
    }
  },
  getters: {
    token: () => Cookies.get('auth-token'),
    cartTotal(state): number {
      return state.cart?.cart_items.reduce((total, item) => total + (item.product_price * item.quantity), 0) || 0;
    }
  },
  actions: {
    async getCart() {
      this.loading = true;
      this.errors = null;
      try {
        const res = await instance.get('/api/cart');
        this.cart = res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const data = error.response.data;

          if (status === 500) {
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

    async addItem(payload: CartForm) {
      this.loading = true;
      this.errors = null;
      try {
        await instance.post('/api/cart', payload);
        this.flashMessage = {message: 'Success Add', status: 'success'}
      } catch (error) {
       if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const data = error.response.data;

          if (status === 422) {
            this.errors = data.errors;
            throw new Error('Validation Error');
          } else if (status === 400) {
            this.errors = data.message;
            throw new Error(this.errors as string);
          } else if (status === 500) {
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

    async updateQuantity(itemId: number, quantity: number) {
      this.loading = true;
      this.errors = null;
      const payload = {
        quantity: quantity,
        _methode: 'PUT'
      }
      try {
        const res = await instance.put(`/api/cart/items/${itemId}`, payload);
        console.log(res.data.data)
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const data = error.response.data;

          if (status === 422) {
            this.errors = data.errors;
            throw new Error('Validation Error');
          } else if (status === 400) {
            this.errors = data.message;
            throw new Error(this.errors as string);
          } else if (status === 500) {
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

    async removeItem(itemId: number) {
      this.loading = true;
      this.errors = null;

      try {
        const res = await instance.delete(`/api/cart/items/${itemId}`);
        console.log(res.data.message);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const data = error.response.data;

          if (status === 500) {
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
    }
  }
})