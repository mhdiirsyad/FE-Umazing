<script setup lang="ts">
import { initFlowbite } from 'flowbite';
import { nextTick, onMounted, ref } from 'vue';
import { useAuthStore } from './store/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { getMe } = authStore;
const { token } = storeToRefs(authStore);
const isAuthenticated = ref(false);

onMounted(async () => {
  if (token.value) {
    try {
      await getMe();
    } catch (error) {
      console.log(error);
    }
  }

  isAuthenticated.value = true;

  nextTick(() => {
    initFlowbite();
  })
})
</script>

<template>
  <div v-if="!isAuthenticated">
    <p>Loading page...</p>
  </div>

  <div v-else>
    <RouterView />
  </div>
</template>

<style scoped></style>
