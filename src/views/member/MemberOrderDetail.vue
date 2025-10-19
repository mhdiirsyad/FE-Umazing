<template>
  <Spinner :loading="loading" :overlay="true" :size="'w-10'">
  </Spinner>
  <Toaster 
    ref="toastRef"
    :message="flashMessage.message"
    :status="flashMessage.status"
    :duration="3000"
  />
  <div class="flex justify-center">
    <div class="p-4 w-[80%]">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Detail Order #{{ selectedOrder?.id }}</h1>

      <div v-if="errors" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> {{ errors }}</span>
      </div>

      <div v-else-if="selectedOrder" class="space-y-8">
        <div class="bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 border-b pb-2">Informasi Order</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><strong>Status:</strong> <span
                :class="{ 'bg-green-100 text-green-800': selectedOrder.status === 'success', 'bg-yellow-100 text-yellow-800': selectedOrder.status === 'pending', 'bg-orange-100 text-orange-800': selectedOrder.status === 'paid', 'bg-blue-100 text-blue-800': selectedOrder.status === 'shipped', 'bg-red-100 text-red-800': selectedOrder.status === 'canceled'}"
                class="px-2 py-1 rounded-full text-xs font-medium">{{ selectedOrder.status }}</span></p>
            <p><strong>Alamat Pengiriman:</strong> {{ selectedOrder.address }}</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p class="mt-4 text-lg font-bold">Total Pembayaran: {{ formatRupiah(selectedOrder.total) }}</p>
            <p class="mt-4"><strong>Metode Pembayaran: </strong>Bank ABC 123456789</p>
          </div>          
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
  </div>
  
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { initFlowbite } from 'flowbite';
import { useOrderStore } from '../../store/order';
import { formatRupiah } from '../../utils/rupiahFormat';
import { useRoute } from 'vue-router';
import Spinner from '../../components/Spinner.vue';
import Toaster from '../../components/Toaster.vue';

const route = useRoute();
const orderStore = useOrderStore();
const { loading, errors, selectedOrder, flashMessage } = storeToRefs(orderStore);

const toastRef = ref<typeof Toaster | null>(null);

const orderId = computed(() => route.params.id)

onMounted(async () => {
  initFlowbite();
  if(flashMessage.value.message){
    toastRef.value?.showToast();

    setTimeout(() => {
      orderStore.clearFlashMessage(); 
    }, 10000); 
  }
  if (orderId.value) {
    const id = parseInt(orderId.value as string)
    await orderStore.getOrder(id);
  }
})
</script>