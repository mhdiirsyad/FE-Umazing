<template>
  <Topbar />
  <SideBar />
  
  <main class="py-15 px-8 sm:ml-64 min-h-screen">
    <RouterView />    
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import SideBar from '../components/SideBar.vue';
import { initFlowbite } from 'flowbite';
import Topbar from '../components/Topbar.vue';

onMounted(() => {
  initFlowbite();
})
</script>

<style scoped></style>