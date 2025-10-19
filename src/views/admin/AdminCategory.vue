<template>
  <div>
    <h1 class="text-xl uppercase font-bold my-2">Manage Categories</h1>
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
            placeholder="Search Category" required />
        </div>
      </form>

      <!-- Modal toggle -->
      <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" @click="modalInstance.show()"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium sm:font-normal rounded-lg text-sm px-5 py-2.5 text-center"
        type="button">
        Add Category
      </button>
    </div>

    <!-- Main modal -->
    <div id="crud-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b border-gray-400 rounded-t">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ modalTitle }}
            </h3>
            <button type="button" @click="modalInstance.hide()"
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
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                <input type="text" name="name" id="name" v-model="form.name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type Category name" required>
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
          <th scope="col" class="px-6 py-3">
            Name
          </th>
          <th scope="col" class="px-6 py-3 text-center">
            Action
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="!loading">
        <tr v-for="category in categories" class="bg-white border-b border-gray-200 hover:bg-gray-50">
          <td class="px-6 py-4 font-semibold">
            #{{ category.id }}
          </td>
          <td class="px-6 py-4">
            {{ category.name }}
          </td>
          <td class="px-6 py-4 text-center flex justify-center gap-2">
            <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" @click="handleEditClick(category.id)"
              class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium sm:font-normal rounded-lg text-sm px-5 py-2.5 text-center"
              type="button">
              Edit
            </button>
            <button @click="handleDeleteClick(category.id, category.name)"
              class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium sm:font-normal rounded-lg text-sm px-5 py-2.5 text-center"
              type="button">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Spinner :loading="loading" class="flex justify-center py-2">
      <span>Loading Categories</span>
    </Spinner>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useCategoryStore } from '../../store/category';
import { storeToRefs } from 'pinia';
import { initFlowbite, Modal } from 'flowbite';
import type { CategoryForm } from '../../types/type';
import Spinner from '../../components/Spinner.vue';
import Toaster from '../../components/Toaster.vue';

const useCategory = useCategoryStore();
const { getAllCategories, addCategory, updateCategory, getCategory, deleteCategory } = useCategory;
const { categories, editingCategory, loading } = storeToRefs(useCategory);

const toastRef = ref<typeof Toaster | null>(null);
const toastMessage = ref('');
const toastStatus = ref<'success' | 'failed'>('success');


const form = reactive<CategoryForm>({
  name: '',
});

const keyWord = ref('');
let debounceTimeout: number | undefined = undefined;
let modalInstance: Modal;

const fetchCategories = () => {
  getAllCategories(keyWord.value);
}

onMounted(async () => {
  initFlowbite();
  await useCategory.getAllCategories();

  const modalEl = document.getElementById('crud-modal');

  if (modalEl) {
    modalInstance = new Modal(modalEl);
  }
});

const handleSearch = () => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(() => {
    fetchCategories();
  }, 500);
}

const handleEditClick = async (categoryId: number) => {
  await getCategory(categoryId);

  modalInstance.show()
}

const isEditing = computed(() => !!editingCategory.value);
const modalTitle = computed(() => isEditing.value ? 'Edit Category' : 'Create New Category');

watch(editingCategory, (newCategory) => {
  if (newCategory) {
    form.name = editingCategory.value?.name;
  } else {
    form.name = '';
  }
}, { immediate: true })

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  try {
    if (isEditing.value && editingCategory.value) {
      await updateCategory(editingCategory.value.id, form);
      toastMessage.value = `Success Edit Category ${form.name}`;
      toastStatus.value = 'success';
    } else {
      await addCategory(form);
      toastMessage.value = `Success add Category ${form.name}`;
      toastStatus.value = 'success';
    }

    if (modalInstance) {
      modalInstance.hide();
    }
    form.name = '';
    editingCategory.value = null;
  } catch (error) {
    toastMessage.value = `Error: ${error}`;
    toastStatus.value = 'failed';
  } finally {
    toastRef.value?.showToast()
  }
}

const handleDeleteClick = async (categoryId: number, categoryName: string) => {
  const isConfirmed = confirm(`Do You want to delete "${categoryName}"?`);

  if (!isConfirmed) {
    return;
  }

  try {
    await deleteCategory(categoryId);
  } catch (error) {
    console.error(error);
  }
}

onUnmounted(() => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
})
</script>

<style scoped></style>