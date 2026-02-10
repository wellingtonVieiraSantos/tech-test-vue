<script setup lang="ts">
import SpreedSheetTable from '../components/features/SpreedSheet/SpreedSheetTable.vue';
import { useDatabaseStore } from '../store/database';
import DownloadButton from '../components/features/SpreedSheet/DownloadButton.vue';
import SearchInput from '../components/features/SpreedSheet/SearchInput.vue';
import CreateProductButton from '../components/features/SpreedSheet/CreateProductButton.vue';
import { storeToRefs } from 'pinia'
import SpreedSheetMetrics from '../components/features/SpreedSheet/SpreedSheetMetrics.vue';
import ModalDelete from '../components/features/SpreedSheet/ModalDelete.vue';
import Modal from '../components/features/SpreedSheet/Modal.vue';
import Filters from '../components/features/SpreedSheet/Filters.vue';
import Ordenation from '../components/features/SpreedSheet/Ordenation.vue';
import { onUnmounted } from 'vue';

const databaseStore = useDatabaseStore()

const { filteredSpreadsheet } = storeToRefs(databaseStore)

onUnmounted(() => {
  databaseStore.resetFilters()
})
</script>

<template>
  <main class="relative w-full lg:h-dvh flex flex-col items-center p-3">
    <h1 class="text-3xl font-bold w-full text-left px-2 mb-4">Painel de Controle</h1>
    <p class='w-full text-left px-2 mb-4 text-xl text-gray-500'>Métricas da planilha</p>
    <SpreedSheetMetrics 
      :productsWithImage="databaseStore.findTotalProductsWithImage" 
      :productsUnvailable="databaseStore.findTotalProductsUnvailable" 
      :productsOk="databaseStore.findTotalProductsOk" 
      :averageScore="databaseStore.findAverageScore" 
    />
    <div class="flex lg:flex-row flex-col gap-4 w-full justify-between mb-4">
      <DownloadButton @save="databaseStore.saveSpreadsheet()"/>
      <CreateProductButton @create="databaseStore.setOpenModal('create')" />
    </div>
    <div class="flex lg:flex-row flex-col items-start gap-4 w-full justify-start mb-4">
      <p class="font-semibold lg:flex hidden">Filtros:</p>
      <SearchInput @search="databaseStore.setSearch($event)" />
      <Filters @status="databaseStore.setStatus($event)" />
      <Ordenation @ordenation="databaseStore.setOrdenation($event)" />
    </div>
    <SpreedSheetTable 
      :rows="filteredSpreadsheet" 
      @openModal="(payload) => databaseStore.setOpenModal(payload.mode, payload.row)" 
    />
    <ModalDelete 
      v-if="databaseStore.modalOpen && databaseStore.modalMode === 'delete'" 
      @close="databaseStore.setCloseModal" 
      @delete="databaseStore.delete(databaseStore.selectedRow?.ID || '')"
    />
    <Modal
      v-if="databaseStore.modalOpen && databaseStore.modalMode === 'update'"
      :row="databaseStore.selectedRow"
      @close="databaseStore.setCloseModal"
      @update="databaseStore.update($event)"
    />
    <Modal
      v-if="databaseStore.modalOpen && databaseStore.modalMode === 'create'"
      @close="databaseStore.setCloseModal"
      @create="databaseStore.create($event)"
    />
  </main>
</template>
