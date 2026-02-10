 <script setup lang="ts">
import BaseButton from '../../base/BaseButton.vue';

const emit = defineEmits(['save'])
</script>

<template>
  <BaseButton @click="emit('save')" class="flex items-center justify-center gap-2 w-full lg:w-fit p-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>    
    Download da planilha
  </BaseButton>
</template>