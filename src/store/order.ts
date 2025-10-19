import { defineStore } from "pinia";
import instance from "../lib/axios";
import Cookies from "js-cookie";
import type { Order, OrderForm, UpdateOrderPayload } from "../types/type";
import axios from "axios";

export const useOrderStore = defineStore('order', {
  state: () => {
    return {
      orders: [] as Order[],
      selectedOrder: null as Order | null,
      loading: false,
      errors: null as Record<string, string[]> | string | null,
      flashMessage: { message: '', status: '' } as { message: string, status: string }
    }
  },

  getters: {
    token: () => Cookies.get('auth_token'),
  },

  actions: {
    async getOrders(keyWord: string = '') {
      this.loading = true;
      this.errors = null;

      try {
        const url = keyWord ? `/api/orders?search=${encodeURIComponent(keyWord)}`
          : '/api/orders';

        const res = await instance.get(url);
        this.orders = res.data.data;
        console.log(res.data.data);
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

    async getOrder(orderId: number) {
      this.loading = true;
      this.errors = null;

      try {
        const res = await instance.get(`/api/order/${orderId}`);
        this.selectedOrder = res.data.data;
        console.log(res.data.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const data = error.response.data;

          if (status === 404) {
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
        this.loading = false;
      }
    },

    async addOrder(payload: OrderForm) {
      this.loading = true;
      this.errors = null;

      try {
        const res = await instance.post('/api/order', payload);
        const newOrder: Order = res.data.data;
        console.log(newOrder);

        this.flashMessage = { message: 'Order successfully made', status: 'success' }
        return newOrder;
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
        this.flashMessage = { message: 'Order failed', status: 'failed' }
      } finally {
        this.loading = false;
      }
    },

    async updateOrder(orderId: number, payload: UpdateOrderPayload) {
      this.loading = true;
      this.errors = null;

      try {
        const res = await instance.patch(`/api/order/${orderId}`, payload);
        await this.getOrder(orderId)
        console.log(res.data.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const data = error.response.data;

          if (status === 400) {
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
        this.loading = false;
      }
    },

    clearFlashMessage() {
      this.flashMessage = { message: '', status: '' }
    },
  }
})