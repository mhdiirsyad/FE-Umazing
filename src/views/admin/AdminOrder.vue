<template>
  <div>
    <h1 class="text-xl uppercase font-bold my-2">Manage Orders</h1>
    <div class="flex flex-col-reverse gap-2 items-start lg:justify-between lg:flex-row py-4">
      <form class="max-w-md">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" v-model="keyWord" @input="handleSearch"
            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Products" required />
        </div>
      </form>
    </div>

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
          <th scope="col" class="px-6 py-3">
            Totals
          </th>
          <th scope="col" class="px-6 py-3">
            Status
          </th>
          <th scope="col" class="px-6 py-3 text-center">
            Action
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="!loading">
        <tr v-for="order in orders" class="bg-white border-b border-gray-200 hover:bg-gray-50">
          <td class="px-6 py-4">
            #{{ order.id }}
          </td>
          <td class="px-6 py-4">
            {{ (order.user) }}
          </td>
          <td class="px-6 py-4">
            {{ formatRupiah(order.total) }}
          </td>
          <td class="px-6 py-4">
            {{ order.status }}
          </td>
          <td class="px-6 py-4 text-center flex justify-center">
            <button @click="handleClickDetail(order.id)"
              class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium sm:font-normal rounded-lg text-sm px-5 py-2.5 text-center"
              type="button">
              Details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
      <Spinner :loading="loading" class="flex justify-center py-2">
        <span>Loading products</span>
      </Spinner>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { initFlowbite } from 'flowbite';
import { useOrderStore } from '../../store/order';
import { formatRupiah } from '../../utils/rupiahFormat';
import router from '../../router';
import Spinner from '../../components/Spinner.vue';

const useOrder = useOrderStore();
const { orders, loading } = storeToRefs(useOrder);

const handleClickDetail = (orderId: number) => {
  console.log(orderId);
  router.push({name: 'admin.orderDetail', params: {id: orderId}})
}

const keyWord = ref('');
let debounceTimeout: number | undefined = undefined;

const fetchOrders = async () => {
  await useOrder.getOrders(keyWord.value)
}

const handleSearch = () => {
  if(debounceTimeout){
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(()=> {
    fetchOrders();
  }, 500);
}

onMounted(async () => {
  await useOrder.getOrders();
  initFlowbite();
});

onUnmounted(() => {
  if(debounceTimeout){
    clearTimeout(debounceTimeout);
  }
})
</script>

<style scoped></style>