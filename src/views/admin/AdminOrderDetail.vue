<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Detail Order #{{ selectedOrder?.id }}</h1>

    <Spinner :loading="loading" :overlay="true" :size="'w-10'">
    </Spinner>

    <Toaster 
    ref="toastRef"
    :message="toastMessage"
    :status="toastStatus"
    :duration="3000"
    />

    <div v-if="errors" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert">
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline"> {{ errors }}</span>
    </div>

    <div v-else-if="selectedOrder" class="space-y-8">
      <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" @click="handleUpdateClick"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium sm:font-normal rounded-lg text-sm px-5 py-2.5 text-center"
        type="button">
        Update Status
      </button>
      <div id="crud-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b border-gray-400 rounded-t">
            <h3 class="text-lg font-semibold text-gray-900">
              Update Status
            </h3>
            <button type="button" @click="modalInstance?.hide()"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-toggle="crud-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <form class="p-4 md:p-5" @submit.prevent="handleSubmit">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                  <label for="category" class="block mb-2 text-sm font-medium text-gray-900">Category</label>
                  <select id="category" v-model="statusForm.status"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                    <option disabled value="">Select category</option>
                    <option v-for="status in availableStatuses" :value="status">{{ status }}
                    </option>
                  </select>
                </div>
            </div>
            <button type="submit" :disabled="loading"
              class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <Spinner :loading="loading" :size="'w-4'">
                <span>Loading...</span>
              </Spinner>
              <div v-if="!loading" class="flex">
                <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>Save</span>
              </div>
            </button>
          </form>
        </div>
      </div>
      </div>

      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4 border-b pb-2">Informasi Order</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p><strong>Status:</strong> <span
              :class="{ 'bg-green-100 text-green-800': selectedOrder.status === 'success', 'bg-yellow-100 text-yellow-800': selectedOrder.status === 'pending', 'bg-orange-100 text-orange-800': selectedOrder.status === 'paid', 'bg-blue-100 text-blue-800': selectedOrder.status === 'shipped', 'bg-red-100 text-red-800': selectedOrder.status === 'canceled'}"
              class="px-2 py-1 rounded-full text-xs font-medium">{{ selectedOrder.status }}</span></p>
          <p><strong>Nama Pelanggan:</strong> {{ selectedOrder.user }}</p>
          <p><strong>Alamat Pengiriman:</strong> {{ selectedOrder.address }}</p>
        </div>
        <p class="mt-4 text-lg font-bold">Total Pembayaran: {{ formatRupiah(selectedOrder.total) }}</p>
      </div>

      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4 border-b pb-2">Daftar Produk</h2>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produk
                </th>
                <th scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga Satuan
                </th>
                <th scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in selectedOrder.order_items" :key="item.product_name">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.product_name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatRupiah(item.product_price) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.quantity }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{{formatRupiah(item.subtotal) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

    <div v-else class="text-center py-10 text-gray-500">
      <p>Order tidak ditemukan.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { initFlowbite, Modal } from 'flowbite';
import { useOrderStore } from '../../store/order';
import { formatRupiah } from '../../utils/rupiahFormat';
import { useRoute } from 'vue-router';
import type { UpdateOrderPayload } from '../../types/type';
import Spinner from '../../components/Spinner.vue';
import Toaster from '../../components/Toaster.vue';

const route = useRoute();
const useOrder = useOrderStore();
const { loading, errors, selectedOrder } = storeToRefs(useOrder);

const orderId = computed(() => route.params.id)

let modalInstance = ref<Modal | null>(null) ;
const statusForm = reactive<UpdateOrderPayload>({ status: '' });
const availableStatuses = ref(['pending', 'paid', 'shipped', 'success', 'canceled']);

const handleUpdateClick = (e: Event) => {
  e.preventDefault();
  const modalEl = document.getElementById('crud-modal');
  if (modalEl) {
    modalInstance.value = new Modal(modalEl);
  }

  if (selectedOrder.value) {
    statusForm.status = selectedOrder.value.status;
  }

  modalInstance.value?.show();
}

const toastRef = ref<typeof Toaster | null>(null);
const toastMessage = ref('');
const toastStatus = ref<'success' | 'failed'>('success');

async function handleSubmit(e: Event) {
  e.preventDefault();
  
  try {
    if (selectedOrder.value && statusForm.status){
      const orderId = selectedOrder.value.id;
      await useOrder.updateOrder(orderId, statusForm); 
      toastMessage.value = `Success Edit Status`;
      toastStatus.value = 'success'; 
    };
    
    if (modalInstance.value) {
      modalInstance.value.hide();
    }
  } catch (error) {
    toastMessage.value = `Error: ${error}`;
    toastStatus.value = 'failed'; 
  } 
}

onMounted(async () => {
  initFlowbite();
  if (orderId.value) {
    const id = parseInt(orderId.value as string)
    await useOrder.getOrder(id);
  }
  const modalEl = document.getElementById('crud-modal');
  if (modalEl) {
    modalInstance.value = new Modal(modalEl);
  }
})
</script>