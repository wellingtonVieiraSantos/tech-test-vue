<script setup lang="ts">
const emit = defineEmits(['status'])

const status = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('status', target.value)
}

</script>

<template>
  <div class="flex gap-2 w-full lg:w-fit items-center justify-center rounded">
      <p>Status:</p>
      <select @change="status($event)" class="w-full outline-none border border-slate-300 rounded p-2">
      <option value="">Todos</option>
      <option value="OK">OK</option>
      <option value="INDISPONIVEL">INDISPONIVEL</option>
      <option value="ERRO">ERRO</option>
     </select>
  </div>  
</template>
    