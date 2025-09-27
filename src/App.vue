<script setup lang="ts">

</script>

<template>
  <header>
    <div class="dark:bg-slate-950 bg-slate-700 p-4">
      <nav class="container mx-auto flex items-center justify-between">
        <RouterLink class="text-slate-100" to="/">Home</RouterLink>
        <div class="flex space-x-2">
          <RouterLink class="text-slate-100" to="/register">Register</RouterLink>
          <RouterLink class="text-slate-100" to="/login">Login</RouterLink>
        </div>
      </nav>
    </div>
  </header>
  <main class="max-w-6xl mx-auto bg-slate-700 dark:bg-slate-900 min-h-screen p-4 flex flex-col items-center">
    <RouterView />
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
