<script setup lang="ts">
import BaseButton from '../../base/BaseButton.vue';
import type { SpreadsheetRow } from '../../../store/database';
import { ref, computed, watchEffect } from 'vue';
import BaseModal from '../../base/BaseModal.vue';
import BaseForm from '../../base/BaseForm.vue';
import { idGenerator } from '../../../lib/idGenerator';
import { validateEAN } from '../../../validators/validateEAN';
import { validateName } from '../../../validators/validateName';

const props = defineProps<{
  row?: SpreadsheetRow
}>()


const emit = defineEmits(['close', 'create', 'update'])

const localRow = ref<SpreadsheetRow>({
  ID: idGenerator(),
  EAN: '',
  Name: '',
  Status: 'OK',
  Score: 0,
  Mirakl_Image: '',
  BB_Image_Url: '',
})

watchEffect(() => {
  if (props.row) {
    localRow.value = { ...props.row }
  }
})

const isUpdateMode = computed(() => !!props.row)


const validateForm = () => {
  if(!validateEAN(localRow.value.EAN) || !validateName(localRow.value.Name)) return false
  return true
}

const submit = () => {
    if (validateForm()) {
        if (isUpdateMode.value) {
            emit('update', localRow.value)
        } else {
            emit('create', localRow.value)
        }
    }
}
</script>


<template>
  <BaseModal :isOpen="true" @close="emit('close')" :modalAriaLabel="isUpdateMode ? 'Atualizar Produto' : 'Criar Produto'" :modalAriaLabelledby="isUpdateMode ? 'Atualizar Produto' : 'Criar Produto'" :modalAriaDescribedby="isUpdateMode ? 'Atualizar Produto' : 'Criar Produto'" :closeButtonLabel="isUpdateMode ? 'Atualizar Produto' : 'Criar Produto'">
    <template #content>
      <BaseForm @submit="submit" :isUpdateMode="isUpdateMode">
        <template #header>
          <h1 class="text-3xl font-bold text-center">{{ isUpdateMode ? 'Atualizar Produto' : 'Criar Produto' }}</h1>
          <p class="text-gray-500 text-sm md:text-md text-center w-full">{{ isUpdateMode ? 'Formulário para atualização de produtos, atente-se aos campos obrigatórios' : 'Formulário para criação de produtos, atente-se aos campos obrigatórios' }}</p>
        </template>
        <template #content>
          <div class="flex flex-col lg:flex-row w-full gap-3">
            <div class="flex-1">
              <label for="id" class="text-left w-full font-bold">ID</label>
              <input type="text" v-model="localRow.ID" disabled class="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100 cursor-not-allowed text-gray-500">
            </div>
            
            <div class="flex-1">
              <label for="ean" class="text-left w-full font-bold">EAN <span class="text-red-500">*</span></label>
              <input type="text" v-model="localRow.EAN" placeholder="EAN do produto" class="border border-gray-300 rounded px-2 py-1 w-full" :class="{'border-red-700 placeholder:text-red-500': !validateEAN(localRow.EAN)}">
              <span v-if="!validateEAN(localRow.EAN)" class="text-red-700 text-sm text-left w-full">Campo precisa conter 13 números e somente números</span>
            </div>
          </div>

          <label for="name" class="text-left w-full font-bold">Nome <span class="text-red-500">*</span></label>
          <input type="text" v-model="localRow.Name" placeholder="Nome do produto" class="border border-gray-300 rounded px-2 py-1 w-full" :class="{'border-red-700 placeholder:text-red-500': !validateName(localRow.Name)}">
          <span v-if="!validateName(localRow.Name)" class="text-red-700 text-sm text-left w-full">Campo precisa conter no mínimo 3 e no máximo 100 caracteres</span>

          <div class="flex flex-col lg:flex-row w-full gap-3">
            <div class="flex-1">
              <label for="status" class="text-left w-full font-bold">Status</label>
              <select v-model="localRow.Status" class="border border-gray-300 rounded px-2 py-1 w-full " >
                <option value="OK">OK</option>
                <option value="INDISPONIVEL">INDISPONIVEL</option>
                <option value="ERRO">ERRO</option>
              </select>
            </div>
            <div class="flex-1">
              <label for="score" class="text-left w-full font-bold">Score</label>
              <input type="number" v-model.number="localRow.Score" min="0" max="1" step="0.0001" placeholder="0.0001" class="border border-gray-300 rounded px-2 py-1 w-full" >
            </div>
          </div>

          <label for="mirakl_image" class="text-left w-full font-bold">Imagem Mirakl</label>
          <input type="text" v-model="localRow.Mirakl_Image" placeholder="URL da imagem Mirakl" class="border border-gray-300 rounded px-2 py-1 w-full" >

          <label for="bb_image_url" class="text-left w-full font-bold">Imagem BB</label>
          <input type="text" v-model="localRow.BB_Image_Url" placeholder="URL da imagem BB" class="border border-gray-300 rounded px-2 py-1 w-full" >
        </template> 
        <template #footer>
          <BaseButton variant="success" type="submit" class="w-full lg:w-fit ml-auto px-8 flex justify-center items-center gap-2 lg:mt-4 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            {{ isUpdateMode ? 'Atualizar produto' : 'Criar produto' }}
          </BaseButton>
        </template>
      </BaseForm>
    </template>
  </BaseModal>
</template>
