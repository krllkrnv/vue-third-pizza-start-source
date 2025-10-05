<template>
  <div class="app-layout">
    <AppHeader />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppHeader from "@/layouts/AppHeader.vue";
</script>
