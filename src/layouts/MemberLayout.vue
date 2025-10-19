<template>
  <Topbar />

  <main class="py-15 px-8 min-h-screen">
    <RouterView />    
  </main>
</template>

<script setup lang="ts">
import Topbar from '../components/Topbar.vue';


</script>

<style scoped></style>