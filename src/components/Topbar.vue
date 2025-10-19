<template>
  <nav class="fixed left-0 top-0 z-50 w-full bg-white border-b border-gray-200">
    <div class="w-full py-3 lg:px-5">
      <div class="flex items-center justify-between pr-4">
        <div class="px-2 flex items-center justify-start rtl:justify-end">
          <button v-if="user?.role=='admin'" data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <span class="sr-only">Open sidebar</span>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
          </button>
          <RouterLink :to="{name: 'home'}" class="flex md:me-24">
            <img src="../assets/logo.png" class="h-8 me-3" alt="FlowBite Logo" />
            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">Umazing</span>
          </RouterLink>
        </div>
        <div v-if="!user" class="flex items-center justify-between gap-4">
          <button data-collapse-toggle="navbar-solid-bg" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-solid-bg" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto absolute top-full left-0 z-40 bg-white shadow-md border-b border-gray-200 md:static md:shadow-none md:border-0" id="navbar-solid-bg">
            <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <RouterLink :to="{name: 'auth.login'}" class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700">Login</RouterLink>
              </li>
              <li>
                <RouterLink :to="{name: 'auth.register'}" class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700">Register</RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="flex items-center gap-2">
          <div v-if="user.role !== 'admin'" class="flex items-center gap-4">          
            <RouterLink :to="{name: 'member.cart'}">
              <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
              </svg>
            </RouterLink>
            <RouterLink :to="{name: 'member.order'}">
              <svg class="w-6 h-6 text-gray-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
              </svg>
            </RouterLink>
          </div>
          
          <div class="flex items-center ms-3">
            <div>
              <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
              </button>
            </div>
            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm" id="dropdown-user">
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900" role="none">
                  {{ user?.name }}
                </p>
                <p class="text-sm font-medium text-gray-900 truncate" role="none">
                  {{ user?.email }}
                </p>
              </div>
              <ul class="" role="none">
                <li>
                  <button :disabled="authLoading" @click="handleLogout" class="w-full block px-4 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-slate-200 rounded-sm" role="menuitem">Sign out</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue';
import { useAuthStore } from '../store/auth';
import { storeToRefs } from 'pinia';
import { initFlowbite } from 'flowbite';

const { logout } = useAuthStore();
const { user, loading: authLoading } = storeToRefs(useAuthStore());


const handleLogout = async (e: Event) => {
  e.preventDefault();
  await logout();
}

onMounted(()=> {
  initFlowbite();
})

watch(user, (newUser) => {
  if(!newUser) {
    nextTick(() => {
      initFlowbite();
    })
  }
}, {immediate: true});

</script>