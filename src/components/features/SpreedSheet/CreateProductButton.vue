<script setup lang="ts">
import BaseButton from '../../base/BaseButton.vue';

const emit = defineEmits(['create'])
</script>

<template>
  <BaseButton variant="success" @click="emit('create')" class="flex items-center justify-center gap-2 w-full lg:w-fit px-6 py-2">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    Criar produto
  </BaseButton>
</template>