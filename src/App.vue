<script setup lang="ts">
  import TheSideBar from './components/layout/TheSideBar.vue'
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <TheSideBar/>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"  />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
