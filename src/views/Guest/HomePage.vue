<template>
  <Topbar />
  <Toaster ref="toastRef" :message="flashMessage.message" :status="flashMessage.status" :duration="3000" />

  <Spinner :loading="loading" :size="'w-10'" overlay />

  <div v-if="!loading" class="p-20 px-4 lg:px-10">
    <div class="flex items-center justify-between mb-4">
      <form class="w-50" @submit.prevent>
      <select id="categories" v-model="category" @change="handleSearch"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        <option value="">Select Category</option>
        <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
      </select>
    </form>
    <form class="max-w-md" @submit.prevent>
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

    <div v-if="products.length === 0" class="flex items-center justify-center">
      <p class="font-semibold text-xl">Product not Found</p>
    </div>

    <!-- PRODUCT CARD -->
    <div v-if="products.length > 0" class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <div v-for="product in products" class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
        <RouterLink :to="{name: 'product.detail', params: {id: product.id}}">
          <div class="h-48 flex items-center justify-center">
            <img class="p-8 rounded-t-lg max-h-full max-w-full object-cover"
              :src="baseUrl + product.image" :alt="product.name" height="100" />
          </div>
        </RouterLink>
        <div class="px-5 pb-5">
          <RouterLink :to="{name: 'product.detail', params: {id: product.id}}">
            <h5 class="text-2xl font-semibold tracking-tight text-gray-900">{{ product.name }}</h5>
          </RouterLink>
          <div class="flex items-stretch justify-center flex-col gap-2">
            <span class="text-xl lg:text-2xl font-semibold text-gray-900">{{ formatRupiah(product.price) }}</span>
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
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Topbar from '../../components/Topbar.vue';
import { useProductStore } from '../../store/product';
import { storeToRefs } from 'pinia';
import { formatRupiah } from '../../utils/rupiahFormat';
import { useAuthStore } from '../../store/auth';
import Toaster from '../../components/Toaster.vue';
import Spinner from '../../components/Spinner.vue';
import { useCategoryStore } from '../../store/category';

const productStore = useProductStore();
const { loading, products, keyWord, category } = storeToRefs(productStore);
const authStore = useAuthStore();
const { flashMessage } = storeToRefs(authStore);
const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);

const baseUrl = computed(()=>import.meta.env.VITE_BACKEND_URL)
const toastRef = ref<typeof Toaster | null>(null);

const debounceTimeout= ref<number | undefined>(undefined);

const handleSearch = () => {
  if(debounceTimeout.value){
    clearTimeout(debounceTimeout.value);
  }

  debounceTimeout.value = setTimeout(async() => {
    await productStore.getProducts(String(keyWord.value), category.value);
  }, 500);
}

onMounted(() => {
  if (flashMessage.value.message) {
    toastRef.value?.showToast();

    setTimeout(() => {
      authStore.clearFlashMessage();
    }, 10000);
  }
  productStore.getProducts();
  categoryStore.getAllCategories();
});

onUnmounted(() => {
  if(debounceTimeout.value){
    clearTimeout(debounceTimeout.value);
  }
})
</script>