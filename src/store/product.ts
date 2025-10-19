import { defineStore } from "pinia";
import instance from "../lib/axios";
import Cookies from "js-cookie";
import type { ProductForm } from "../types/type";
import axios from "axios";

type Product = {
  id: number,
  name: string,
  price: number,
  stock: number,
  description: string,
  image?: File,
  is_active: string,
  category_id: number,
}

export const useProductStore = defineStore('product', {
  state: () => {
    return {
      products: [] as Product[],
      selectedProduct: null as Product | null,
      keyWord: '' as String,
      category: null as Number | null,
      loading: false,
      errors: null as Record<string, string[]> | string | null
    }
  },

  getters: {
    token: () => Cookies.get('auth_token'),
  },

  actions: {
    async getProducts(keyWord: string = '', category: Number | null = null) {
      this.loading = true;
      this.errors = null;
      const urlParams = new URLSearchParams();

      if(keyWord) {
        urlParams.append('search', keyWord)
      }

      if(category) {
        urlParams.append('category', category.toString())
      }

      const queryString = urlParams.toString();
      const url = `/api/product${queryString ? `?${queryString}` : ''}`;
      try {
        const res = await instance.get(url);
        const { data } = res
        this.products = data.data;
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

    async setKeyword(key: string) {
      this.keyWord = key;

      await this.getProducts(key);
    },

    async getProduct(id: number) {
      this.loading = true;
      this.errors = null;

      try {
        const res = await instance.get(`/api/product/${id}`);
        const { data } = res
        console.log(data.data);
        this.selectedProduct = data.data;
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

    async addProduct(payload: ProductForm) {
      this.loading = true;
      this.errors = null;

      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('price', payload.price.toString());
      formData.append('stock', payload.stock.toString());
      formData.append('description', payload.description);
      formData.append('is_active', payload.is_active === '1' ? '1' : '0');
      formData.append('category_id', payload.category_id.toString());

      if(payload.image) {
        formData.append('image', payload.image, payload.image.name);
      }

      try {
        const res = await instance.post('/api/product', formData);
        await this.getProducts();
        console.log(res.data.data);
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
        this.loading = false;
      }
    },

    async updateProduct(id: number, payload: ProductForm) {
      this.loading = true;
      this.errors = null;

      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', payload.name);
      formData.append('price', payload.price.toString());
      formData.append('stock', payload.stock.toString());
      formData.append('description', payload.description);
      formData.append('is_active', payload.is_active === '1' ? '1' : '0');
      formData.append('category_id', payload.category_id.toString());

      if(payload.image instanceof File) {
        formData.append('image', payload.image, payload.image.name);
      }

      try {
        await instance.post(`/api/product/${id}`, formData);
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
        this.loading = false;
      }
    },

    async deleteProduct(id: number) {
      this.loading = true;
      this.errors = null;

      try {
        await instance.delete(`/api/product/${id}`);
        await this.getProducts();
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
  }
})