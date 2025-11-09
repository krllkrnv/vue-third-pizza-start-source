<template>
  <div class="app-layout">
    <AppHeader />
    <main class="content">
      <Transition name="slide" mode="out-in">
        <router-view />
      </Transition>
    </main>
  </div>
</template>

<script setup>
import AppHeader from "@/layouts/AppHeader.vue";
</script>

<style scoped>
.content {
  overflow: hidden;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
