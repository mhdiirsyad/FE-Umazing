<template>
  <Spinner 
    :loading="loading"
    overlay
    :size="'w-10'"
  />
  <div class="p-20 py-8">
    <div class="flex items-start justify-center w-full min-h-screen">
      <div v-if="selectedProduct" class="px-4 lg:px-10 flex flex-col gap-4 items-center justify-center w-full">
        <div class="w-full flex gap-4 bg-white border-gray-200 rounded-lg shadow-md">
          <div class="w-80 h-80 rounded-lg">
            <img :src="baseUrl + selectedProduct.image" :alt="selectedProduct.name" class="p-4 w-full h-full object-cover">
          </div>
          <div class="p-4">
            <div class="font-bold text-2xl">{{ selectedProduct.name.toUpperCase() }}</div>
            <p class="text-sm">stok: <strong>{{ selectedProduct.stock }}</strong></p>
            <p class="font-bold text-xl mt-2">{{ formatRupiah(selectedProduct.price) }}</p>
            <p class="font-semibold text-md mt-2">DESKRIPSI</p>
            <p>{{ selectedProduct.description }}</p>
          </div>
        </div>
      </div>

      <div class="w-[30%] bg-white border border-gray-200 rounded-lg shadow-sm">
        <div class="p-5 flex flex-col gap-2 items-center justify-center w-full">
          <p><strong>Add to Cart</strong></p>
          <div>
            <form class="max-w-xs flex flex-col items-center mx-auto">
              <label for="counter-input" class="block mb-1 text-sm font-medium text-gray-900">Choose quantity:</label>
              <div class="relative flex items-center">
                <button type="button" @click="handleDecrement"
                  class="shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                  <svg class="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M1 1h16" />
                  </svg>
                </button>
                <input type="text" id="counter-input" v-model="quantity" data-input-counter
                  class="shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                  placeholder="" required />
                <button type="button" @click="handleIncrement" id="increment-button" data-input-counter-increment="counter-input"
                  class="shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                  <svg class="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 1v16M1 9h16" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div class="w-full flex justify-between">
            <p>Subtotal:</p>
            <p>{{ formatRupiah(subtotal) }}</p>
          </div>
          <div class="mt-4 flex justify-center w-full">
            <RouterLink :to="{name: 'member.cart'}"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add
              to cart</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Spinner from '../../components/Spinner.vue';
import { useProductStore } from '../../store/product';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatRupiah } from '../../utils/rupiahFormat';

const baseUrl = computed(()=>import.meta.env.VITE_BACKEND_URL)
const productStore = useProductStore();
const {loading, selectedProduct} = storeToRefs(productStore);

const route = useRoute();
const productId = computed(() => route.params.id)

const quantity = ref(1);
const handleIncrement = () => {
  if  (selectedProduct.value) {
    if (quantity.value < selectedProduct.value?.stock){
      quantity.value += 1;
    }
  }
}

const handleDecrement = () => {
  if (quantity.value > 1){
    quantity.value -= 1;
  }
}

const subtotal = computed(() => quantity.value * (selectedProduct.value?.price || 0))
onMounted(async ()=> {
  if(productId.value){
    const id = parseInt(productId.value as string);
    await productStore.getProduct(id);
  }
})

</script>