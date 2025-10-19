<template>
  <Spinner :loading="loading" :size="'w-10'" overlay />
  <Toaster 
    ref="toastRef"
    :message="flashMessage.message"
    :status="flashMessage.status"
    :duration="3000"
  />
  <div class="grid grid-cols-3 gap-4 py-4 w-full">
    <div
      class="flex flex-col items-center justify-center gap-2 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
      <p class="font-bold text-gray-700">Order success</p>
      <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ totalOrders }}</h3>
    </div>
    <div
      class="flex flex-col items-center justify-center gap-2 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
      <p class="font-bold text-gray-700">Product Sold</p>
      <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ totalProductSold }}</h3>
    </div>
    <div
      class="flex flex-col items-center justify-center gap-2 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
      <p class="font-bold text-gray-700">Revenues</p>
      <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ formatRupiah(totalSales) }}</h3>
    </div>
  </div>

  <!-- Best Seller Product -->
  <div class="mb-2">
    <h1 class="font-bold text-xl">Product Best Seller</h1>
  </div>
  <div class="shadow-md sm:rounded-lg w-full">
    <table class="text-sm w-full text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">
            ID
          </th>
          <th scope="col" class="px-6 py-3">
            Name
          </th>
          <th scope="col" class="px-6 py-3 text-center">
            Stock
          </th>
          <th scope="col" class="px-6 py-3 text-center">
            Total Sold
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in bestSellProduct" class="bg-white border-b border-gray-200 hover:bg-gray-50">
          <td class="px-6 py-4 font-semibold">
            #{{ product.product.id }}
          </td>
          <td class="px-6 py-4">
            {{ product.product.name }}
          </td>
          <td class="px-6 py-4 text-center">
            <span v-if="product.product.stock === 0" class="text-red-600 bg-red-100">Out of Stock</span>
            <span class="p-2 rounded-lg" :class="{
              'text-green-600 bg-green-100': product.product.stock > 10,
              'text-yellow-600 bg-yellow-100': product.product.stock < 10 && product.product.stock > 0,
            }">{{ product.product.stock }}</span>
          </td>
          <td class="px-6 py-4 text-center">
            {{ product.total_sold }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAdminDashboardStore } from '../../store/adminDashboard';
import { storeToRefs } from 'pinia';
import { formatRupiah } from '../../utils/rupiahFormat';
import Spinner from '../../components/Spinner.vue';
import { useAuthStore } from '../../store/auth';
import Toaster from '../../components/Toaster.vue';

const useAdminDashboard = useAdminDashboardStore();
const { totalOrders, totalProductSold, totalSales, bestSellProduct, loading } = storeToRefs(useAdminDashboard);
const authStore = useAuthStore();
const {flashMessage} = storeToRefs(authStore);
const toastRef = ref<typeof Toaster | null>(null);

onMounted(async () => {
  if(flashMessage.value.message){
    toastRef.value?.showToast();

    setTimeout(() => {
      authStore.clearFlashMessage(); 
    }, 10000); 
  }
  await useAdminDashboard.getStatistics();
})
</script>
