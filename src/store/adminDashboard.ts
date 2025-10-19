import { defineStore } from "pinia";
import type { BestSellProduct } from "../types/type";
import Cookies from "js-cookie";
import instance from "../lib/axios";

export const useAdminDashboardStore = defineStore('adminDashboard', {
  state() {
      return {
        totalSales: 0,
        totalProductSold: 0,
        totalOrders: 0,
        bestSellProduct: [] as BestSellProduct[],
        loading: false,
        errors: '' as String | null,
      }
  },

  getters: {
    token: () => Cookies.get('auth_token'),
  },

  actions: {
    async getStatistics() {
      this.loading=true;
      this.errors=null;
      try {
        const {data} = await instance.get('/api/stats');
        this.totalOrders = data.data.total_order;
        this.totalProductSold = data.data.total_product_sold;
        this.totalSales = data.data.total_revenue;
        this.bestSellProduct = data.data.best_sell_product;
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false;
      }
    }
  }
})