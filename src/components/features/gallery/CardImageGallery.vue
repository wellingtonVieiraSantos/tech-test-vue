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
  <BaseCard class="pb-4 cursor-pointer" @click="openUpdateModal(row)">
    <template #header>
      <img :src="row.BB_Image_Url" v-if="validateImg(row.BB_Image_Url)" :alt="row.Name">
      <img :src="row.Mirakl_Image" v-else-if="validateImg(row.Mirakl_Image)" :alt="row.Name">
      <div v-else class="bg-linear-to-tl from-gray-200 via-gray-100 to-gray-200 h-72 flex items-center justify-center">
        <span class="text-gray-400 text-lg font-semibold">Sem imagem</span>
      </div>
    </template>
    <template #footer>
      <p class="text-center px-2 mb-2">{{ row.Name }}</p>
      <p class="text-center font-semibold" :class="row.Status === 'OK' ? 'text-green-600' : row.Status === 'INDISPONIVEL' ? 'text-red-600' : 'text-yellow-700'">
        {{ row.Status === 'OK' ? 'DISPONIVEL' : row.Status === 'INDISPONIVEL' ? 'INDISPONIVEL' : 'ERRO' }}
      </p>
    </template>
  </BaseCard>
</template>