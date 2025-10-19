<script lang="ts" setup>
import { reactive } from 'vue';
import { useAuthStore } from '../../store/auth';
import type { RegisterForm } from '../../types/type';
import { storeToRefs } from 'pinia';
import Spinner from '../../components/Spinner.vue';

const authStore = useAuthStore();
const {errors, loading} = storeToRefs(authStore)

const form = reactive<RegisterForm>({
  name: '',
  email: '',
  password: '',
})

const handleRegister = async (payload: RegisterForm) => {
  await authStore.register(payload);
}
</script>


<template>
  <div class="flex flex-col lg:flex-row justify-center items-center w-full gap-8 mt-10">
    <div
      class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      <form class="space-y-6" @submit.prevent="handleRegister(form)">
        <h5 class="text-xl font-medium text-gray-900">Register to our platform</h5>
        <div v-if="typeof errors === 'string'" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ errors }}
        </div>
        <div> 
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Your name</label>
          <input v-model="form.name" type="text" name="name" id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="your name"/>
          <p v-if="typeof errors === 'object' && errors?.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</p>
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
          <input v-model="form.email" type="email" name="email" id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@company.com"/>
          <p v-if="typeof errors === 'object' && errors?.email" class="text-red-500 text-sm mt-1">{{ errors.email[0] }}</p>
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
          <input v-model="form.password" type="password" name="password" id="password" placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <p v-if="typeof errors === 'object' && errors?.password" class="text-red-500 text-sm mt-1">{{ errors.password[0] }}</p>
        </div>
        <button type="submit" :disabled="loading"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          <Spinner :loading="loading" :size="'w-4'" class="flex justify-center">
            <span>Loading...</span>
          </Spinner>
          <span v-if="!loading">Register</span>
        </button>
        <div class="text-sm font-medium text-gray-500">
          Have registered? <RouterLink to="/auth/login" class="text-blue-700 hover:underline">Sign in
            account</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>