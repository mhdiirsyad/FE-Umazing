import { defineStore } from "pinia";
import instance from "../lib/axios";
import Cookies from "js-cookie";


type Category = {
  id: number;
  name: string;
}

interface FormCategory {
  name: string | undefined;
}

export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      categories: [] as Category[],
      editingCategory: null as Category | null,
      loading: false,
      errors: '' as String | null,
    }
  },

  getters: {
    token: () => Cookies.get('auth_token'),
  },

  actions: {
    async getAllCategories(keyWord: string = '') {
      this.loading = true;
      this.errors = null;
      try {
        const url = keyWord
          ? `api/category?search=${encodeURIComponent(keyWord)}`
          : `api/category`;
        const res = await instance.get(url);
        console.log(res.data);
        this.categories = res.data.data;
        console.log(this.categories);
      } catch (error) {
        this.errors = error instanceof Error ? error.message : String(error);
        console.log(this.errors);
      } finally {
        this.loading = false;
      }
    },

    async addCategory(payload: FormCategory) {
      this.loading = true;
      this.errors = null;

      try {
        const res = await instance.post('/api/category', payload);
        this.getAllCategories();
        console.log(res.data);
      } catch (error) {
        this.errors = error instanceof Error ? error.message : String(error);
        console.log(error);
      } finally {
        this.loading = false
      }
    },

    async getCategory(id: number) {
      this.loading = true;
      this.errors = null;

      try {
        const res = await instance.get(`/api/category/${id}`);
        this.editingCategory = res.data.data;
      } catch (error) {
        this.errors = error instanceof Error ? error.message : String(error);
        console.log(error);
      } finally {
        this.loading = false
      }
    },

    async updateCategory(id: number | undefined, payload: FormCategory) {
      this.loading = true;
      this.errors = null;

      try {
        const res = await instance.put(`/api/category/${id}`, payload);
        await this.getAllCategories();
        console.log(res.data);
      } catch (error) {
        this.errors = error instanceof Error ? error.message : String(error);
        console.log(error);
      } finally {
        this.loading = false
      }
    },

    async deleteCategory(id: number | undefined) {
      this.loading = true;
      this.errors = null;

      try {
        const res = await instance.delete(`/api/category/${id}`);
        await this.getAllCategories();
        console.log(res.data);
      } catch (error) {
        this.errors = error instanceof Error ? error.message : String(error);
        console.log(error);
      } finally {
        this.loading = false
      }
    },
  }
})