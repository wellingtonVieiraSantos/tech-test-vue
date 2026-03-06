<script setup lang="ts">
import { useDatabaseStore } from '../store/database'
import Modal from '../components/features/SpreedSheet/Modal.vue';
import CardImageGallery from '../components/features/gallery/CardImageGallery.vue';
import { onMounted } from 'vue';

const databaseStore = useDatabaseStore()

onMounted(() => {
  databaseStore.resetFilters()
})
</script>

<template>
  <main class="w-full flex flex-col items-center p-3">
    <h1 class="text-2xl font-bold text-left px-2 mb-8 w-full">Galeria de Imagens</h1>
    <div class='grid gap-4 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]'>
      <CardImageGallery 
        v-for="item in databaseStore.spreadsheet" 
        :key="item.ID" 
        :row="item" 
        @openModal="(payload) => databaseStore.setOpenModal(payload.mode, payload.row)"
        
      />
    </div>  
    <Modal
      v-if="databaseStore.modalOpen && databaseStore.modalMode === 'update'"
      :row="databaseStore.selectedRow"
      @close="databaseStore.setCloseModal"
      @update="databaseStore.update($event)"
    />
  </main>
</template>
