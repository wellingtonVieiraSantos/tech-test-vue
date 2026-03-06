<script setup lang="ts">
import BaseButton from '../base/BaseButton.vue';
import { ref } from 'vue';

const openMenu = ref(false)
</script>

<template>
  <!-- nav desktop -->
  <nav class='md:flex sticky top-0 hidden h-screen w-64 flex-col bg-indigo-100 shadow p-2'> 
    <header class='h-20 w-full'>
      <div class='h-full flex items-center justify-center'>
        <h1 class='text-3xl font-extrabold bg-linear-to-bl from-blue-400 to-blue-700 text-transparent bg-clip-text whitespace-nowrap'> Tech Test </h1>
      </div>
    </header>
    <ul class='h-full w-full text-xl flex flex-col pt-30 items-center gap-4 p-2 text-slate-500'>
      <li class='hover:bg-blue-200 w-full text-center p-2 rounded-lg transition-colors duration-300'>
        <RouterLink to="/dashboard" class='cursor-pointer' active-class='text-black font-semibold'>Dashboard</RouterLink>
      </li>
      <li class='hover:bg-blue-200 w-full text-center p-2 rounded-lg transition-colors duration-300'>
        <RouterLink to="/gallery" class='cursor-pointer' active-class='text-black font-semibold'>Gallery</RouterLink>
      </li>
    </ul>
  </nav>
  <!-- nav mobile -->
  <nav class='md:hidden relative w-full flex justify-between items-center px-2' >
    <header class='h-20 w-full'>
      <div class='h-full flex items-center justify-start'>
        <h1 class='text-2xl font-extrabold bg-linear-to-bl from-blue-400 to-blue-700 text-transparent bg-clip-text'> Tech Test </h1>
      </div>
    </header>
    <BaseButton class="flex gap-2 bg-amber-50 h-full" @click="openMenu = !openMenu">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </BaseButton>
  </nav>
  <ul class='fixed top-0 right-0 z-50 h-dvh w-full bg-sky-50 text-xl flex flex-col items-center justify-center gap-8 p-2 shadow-lg text-slate-400 transition-transform duration-300' :class="openMenu ? 'translate-x-0' : 'translate-x-full'">
    <li class='hover:bg-slate-200 w-full text-center p-2 rounded-lg transition-colors duration-300' @click="openMenu = false">
      <RouterLink to="/dashboard" class='cursor-pointer' active-class='text-black font-semibold'>Dashboard</RouterLink>
    </li>
    <li class='hover:bg-slate-200 w-full text-center p-2 rounded-lg transition-colors duration-300' @click="openMenu = false">
        <RouterLink to="/gallery" class='cursor-pointer' active-class='text-black font-semibold'>Gallery</RouterLink>
    </li>
    <div role="button" tabindex="0" class="fixed top-2 right-2 z-50 flex gap-2 border border-slate-300 p-2 rounded bg-amber-50" @click="openMenu = false" v-if="openMenu">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="black" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  </ul>
</template>
