<script setup lang="ts">
import type { SpreadsheetRow } from '../../../store/database';
import BaseTable from '../../base/BaseTable.vue';

const columns: (keyof SpreadsheetRow | 'Actions')[] = ['ID', 'EAN', 'Name', 'Status', 'Score', 'Mirakl_Image', 'BB_Image_Url', 'Actions']

defineProps<{ rows: SpreadsheetRow[] }>()
const emit = defineEmits(['openModal'])

const openModalDelete = (row: SpreadsheetRow) => {
  emit('openModal', { mode: 'delete', row })
}

const openUpdateModal = (row: SpreadsheetRow) => {
  emit('openModal', { mode: 'update', row })
}

</script>

<template>
  <BaseTable :headers="columns" :rows="rows" :rowKey="(row: SpreadsheetRow) => row.ID">
    <template #cell-Actions="{ row }">
      <div class="flex gap-4 justify-center">
          <svg @click="openUpdateModal(row)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.3" stroke="currentColor" class="size-6 cursor-pointer hover:text-blue-600 transition duration-300">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          <svg @click="openModalDelete(row)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.3" stroke="currentColor" class="size-6 cursor-pointer hover:text-red-600 transition duration-300">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
      </div>
    </template>
    <template #cell-Status="{ row }">
      <div class="flex gap-2 justify-center">
        <div :class="row.Status === 'OK' ? 'text-green-700 bg-green-100' : row.Status === 'INDISPONIVEL' ? 'text-red-700 bg-red-100' : 'text-yellow-700 bg-yellow-100'" class="rounded font-semibold px-3 text-center ">{{ row.Status }}</div>
      </div>
    </template>
    <template #no-data>
      <p>Nenhum produto encontrado para a sua busca</p>
    </template>
  </BaseTable>
</template>