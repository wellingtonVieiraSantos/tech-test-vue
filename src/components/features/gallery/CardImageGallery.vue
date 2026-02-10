<script setup lang="ts">
import type { SpreadsheetRow } from '../../../store/database';
import { validateImg } from '../../../validators/validateImg';
import BaseCard from '../../base/BaseCard.vue';

defineProps<{ row: SpreadsheetRow }>()
const emit = defineEmits(['openModal'])

const openUpdateModal = (row: SpreadsheetRow) => {
  emit('openModal', { mode: 'update', row })
}

</script>

<template>
  <BaseCard class="relative h-full flex flex-col items-center justify-center rounded-2xl bg-white pb-4 group duration-300 cursor-pointer" @click="openUpdateModal(row)">
    <div class="absolute text-white top-0 right-0 w-fit h-fit z-10 flex items-center gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-500/50 backdrop-blur-sm px-6 py-2 rounded-tr-2xl rounded-bl-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
      <span class="text-lg font-semibold">
        Editar
      </span>
    </div>
    <template #header>
      <img :src="row.BB_Image_Url" v-if="validateImg(row.BB_Image_Url)" :alt="row.Name">
      <img :src="row.Mirakl_Image" v-else-if="validateImg(row.Mirakl_Image)" :alt="row.Name">
      <div v-else class=" bg-linear-to-tl from-gray-200 via-gray-100 to-gray-200 rounded-t-lg h-full flex items-center justify-center">
        <span class="text-gray-400 text-lg font-semibold">Sem imagem</span>
      </div>
    </template>
    <template #footer>
      <p class="text-center px-2 mb-2">{{ row.Name }}</p>
      <p class="text-center" :class="row.Status === 'OK' ? 'text-green-500' : row.Status === 'INDISPONIVEL' ? 'text-red-500' : 'text-yellow-700'">
        {{ row.Status === 'OK' ? 'DISPONIVEL' : row.Status === 'INDISPONIVEL' ? 'INDISPONIVEL' : 'ERRO' }}
      </p>
    </template>
  </BaseCard>
</template>