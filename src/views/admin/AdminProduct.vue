<template>
  <div>
    <h1 class="text-xl uppercase font-bold my-2">Manage Products</h1>
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

      <!-- Modal toggle -->
      <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" @click="modalInstance.show()"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium sm:font-normal rounded-lg text-sm px-5 py-2.5 text-center"
        type="button">
        Add Product
      </button>
    </div>

    <!-- Main modal -->
    <div id="crud-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" 
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"> 
            <h3 class="text-lg font-semibold text-gray-900">
              {{ modalTitle }}
            </h3>
            <button type="button" @click="handleClose"
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
          <div class="overflow-y-auto max-h-[70vh]">
            <form class="p-4 md:p-5" @submit.prevent="handleSubmit">
              <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="flex items-center justify-center w-full col-span-2">
                  <label for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100"
                    :class="{
                      'bg-blue-100 border-blue-500': isDragging,
                      'bg-gray-50 border-gray-300 hover:bg-gray-100': !isDragging && !imageUrl,
                      'p-0': imageUrl
                    }" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave"
                    @drop.prevent="handleDrop">
                    <div v-if="imageUrl" class="relative w-full h-full">
                      <img :src="imageUrl" alt="Product Preview" class="w-full h-full object-cover rounded-lg">
                      <button type="button" @click.stop="removeImage"
                        class="absolute top-2 right-2 text-white bg-red-600 rounded-full p-1 z-10">
                        &times;
                      </button>
                    </div>
                    <div v-else class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and
                        drop</p>
                      <p class="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" @change="handleUploadImage" accept="image/*" />
                  </label>
                </div>
                <div class="col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                  <input type="text" name="name" id="name" v-model="form.name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type product name" required>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Price</label>
                  <input type="number" name="price" id="price" v-model="form.price"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="$2999" required>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label for="stock" class="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                  <input type="number" name="stock" id="stock" v-model="form.stock"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="$2999" required>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label for="category" class="block mb-2 text-sm font-medium text-gray-900">Category</label>
                  <select id="category" v-model="form.category_id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                    <option disabled value="">Select category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
                    </option>
                  </select>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label for="status" class="block mb-2 text-sm font-medium text-gray-900">Status</label>
                  <select id="status" v-model="form.is_active"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                    <option disabled value="">Select Status</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div class="col-span-2">
                  <label for="description" class="block mb-2 text-sm font-medium text-gray-900"> Product
                    Description</label>
                  <textarea id="description" rows="4" v-model="form.description"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write product description here"></textarea>
                </div>
              </div>
              <button type="submit" :disabled="loading"
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                <Spinner :loading="loading" :size="'h-4'" class="flex">
                  <span>Loading...</span>
                </Spinner>
                <div v-if="!loading" class="flex">
                  <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span>{{ modalTitle }}</span>
                </div>
              </button>
            </form>
          </div>          
        </div>
      </div>
    </div>
  </div>

  <Toaster 
    ref="toastRef"
    :message="toastMessage"
    :status="toastStatus"
    :duration="3000"
  />

  <div class="shadow-md sm:rounded-lg w-full">
    <table class="text-sm w-full text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">
            ID
          </th>
          <th scope="col" class="px-6 py-3 text-center">
            Image
          </th>
          <th scope="col" class="px-6 py-3">
            Name
          </th>
          <th scope="col" class="px-6 py-3">
            Price
          </th>
          <th scope="col" class="px-6 py-3 text-center">
            Stock
          </th>
          <th scope="col" class="px-6 py-3 text-center">
            Action
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="!loading">
        <tr v-for="product in products" class="bg-white border-b border-gray-200 hover:bg-gray-50">
          <td class="px-6 py-4">
            #{{ product.id }}
          </td>
          <td class="px-6 py-4 w-40 h-40">
            <img :src="baseUrl+product.image" :alt="product.name" class="max-h-full max-w-full object-cover">
          </td>
          <td class="px-6 py-4">
            {{ product.name }}
          </td>
          <td class="px-6 py-4">
            {{ formatRupiah(product.price) }}
          </td>
          <td class="px-6 py-4 text-center">
            <span v-if="product.stock===0" class="text-red-600 bg-red-100">Out of Stock</span>
            <span v-else class="p-2 rounded-lg" :class="{
              'text-green-600 bg-green-100' : product.stock > 10,
              'text-yellow-600 bg-yellow-100' : product.stock <= 10 && product.stock > 0,
            }">{{ product.stock }}</span>
          </td>
          <td class="px-6 py-4 text-center flex items-center justify-center gap-2">
            <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" @click="handleEditClick(product.id)"
              class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium sm:font-normal rounded-lg text-sm px-5 py-2.5 text-center"
              type="button">
              Edit
            </button>
            <button @click="handleDeleteClick(product.id, product.name)"
              class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium sm:font-normal rounded-lg text-sm px-5 py-2.5 text-center"
              type="button">
              Delete
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
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { initFlowbite, Modal } from 'flowbite';
import { useProductStore } from '../../store/product';
import { type ProductForm } from '../../types/type';
import { useCategoryStore } from '../../store/category';
import { formatRupiah } from '../../utils/rupiahFormat';
import Spinner from '../../components/Spinner.vue';
import Toaster from '../../components/Toaster.vue';

const useProduct = useProductStore();
const { products, selectedProduct, loading } = storeToRefs(useProduct);
const useCategory = useCategoryStore();
const { categories } = useCategory;
const imageUrl = ref<string | null>(null);
const isDragging = ref(false);

const toastRef = ref<typeof Toaster | null>(null);
const toastMessage = ref('');
const toastStatus = ref<'success' | 'failed'>('success');
const baseUrl = computed(()=>import.meta.env.VITE_BACKEND_URL)

const keyWord = ref('');
const form = reactive<ProductForm>({
  name: '',
  price: 0,
  stock: 0,
  description: '',
  is_active: '1',
  image: null,
  category_id: 0,
})

let debounceTimeout: number | undefined = undefined;
let modalInstance: Modal;

const getProducts = () => {
  useProduct.getProducts(keyWord.value);
}

const handleSearch = () => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(() => {
    getProducts();
  }, 500);
}

const handleEditClick = (productId: number) => {
  useProduct.getProduct(productId);

  modalInstance.show();
}

const isEditing = computed(() => !!selectedProduct.value);
const modalTitle = computed(() => isEditing.value ? 'Edit Product' : 'Create New Product');

watch(selectedProduct, (newProduct) => {
  if (newProduct) {
    form.name = newProduct.name;
    form.price = newProduct.price;
    form.stock = newProduct.stock;
    form.description = newProduct.description;
    form.is_active = newProduct.is_active;
    form.image = null;
    form.category_id = newProduct.category_id;

    if(newProduct.image && typeof newProduct.image === 'string') {
      imageUrl.value = baseUrl.value+newProduct.image;
    }else{
      imageUrl.value = null;
    }
  } else {
    form.name = '';
    form.price = 0;
    form.stock = 0;
    form.description = '';
    form.is_active = '0';
    form.image = null;
    form.category_id = 0;
    imageUrl.value = null;
  }
}, { immediate: true });

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  try {
    if (isEditing.value && selectedProduct.value) {
      await useProduct.updateProduct(selectedProduct.value.id, form);
      toastMessage.value = `Success Edit Product ${form.name}`;
      toastStatus.value = 'success';
    } else {
      await useProduct.addProduct(form);
      toastMessage.value = `Success Add Product ${form.name}`;
      toastStatus.value = 'success';
    }

    if (modalInstance) {
      modalInstance.hide()
    }

    await useProduct.getProducts();
    selectedProduct.value = null
  } catch (error) {
    toastMessage.value = `Error ${error}`;
    toastStatus.value = 'failed';
  } finally {
    toastRef.value?.showToast();
  }
}

const handleClose = (e: Event) => {
  e.preventDefault();

  form.name = '';
  form.price = 0;
  form.stock = 0;
  form.description = '';
  form.is_active = '0';
  form.image = null;
  form.category_id = 0;
  imageUrl.value = null; 
  selectedProduct.value = null; 

  modalInstance.hide()
}

const handleDeleteClick = (productId: number, productName: string) => {
  confirm(`Are you sure to delete "${productName}"?`);

  if (!confirm) {
    return
  }

  try {
    useProduct.deleteProduct(productId);
  } catch (error) {
    console.log(error);
  }
}

const processFile = (file: File) => {
  form.image = file;

  imageUrl.value = URL.createObjectURL(file);

  isDragging.value = false;
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = true;
}

const handleDragLeave = () => {
  isDragging.value = false;
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;

  const files = e.dataTransfer?.files;
  if (files && files.length > 0 && files[0]) {
    processFile(files[0]);
  }
}

const handleUploadImage = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    processFile(file);
  }
}

const removeImage = () => {
  form.image = null;
  imageUrl.value = null;
}

onMounted(async () => {
  await useProduct.getProducts();
  await useCategory.getAllCategories();

  const modalEl = document.getElementById('crud-modal');
  if (modalEl) {
    modalInstance = new Modal(modalEl);
  }
})

onUnmounted(() => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  toastRef.value?.showToast()
})
</script>

<style scoped></style>