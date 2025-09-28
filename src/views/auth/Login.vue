<script lang="ts" setup>
import { reactive } from 'vue';
import { useAuthStore } from '../../store/auth';
import type { LoginForm } from '../../types/type';
import 'flowbite';
import Auth from '../../layouts/auth.vue';

const authStore = useAuthStore();
const form = reactive<LoginForm>({
  email: '',
  password: '',
})

const handleLogin = async (payload: LoginForm) => {
  await authStore.login(payload);
}
</script>


<template>
  <!-- <SideBar /> -->
  <div class="flex flex-col lg:flex-row justify-center items-center w-full gap-8 mt-10">
    <img src="/public/logo.jpg" alt="" width="500" height="500">
    <div
      class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form class="space-y-6" @submit.prevent="handleLogin(form)">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input v-model="form.email" type="email" name="email" id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com" required />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input v-model="form.password" type="password" name="password" id="password" placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required />
        </div>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="remember" type="checkbox" value=""
                class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required />
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
          </div>
          <a href="#" class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
        </div>
        <button type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login
          to your account</button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <RouterLink to="/auth/register" class="text-blue-700 hover:underline dark:text-blue-500">Create
            account</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>