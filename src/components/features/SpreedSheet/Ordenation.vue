 <script setup lang="ts">
const emit = defineEmits(['ordenation'])

const ordenation = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('ordenation', target.value)
}
</script>

<template>
    <div class="flex gap-2 items-center justify-center rounded lg:ml-auto lg:pr-4 w-full lg:w-fit">
        <p class="font-semibold whitespace-nowrap">Ordenar por:</p>
        <select class="w-full outline-none border border-slate-300 rounded p-2" @change="ordenation($event)">
        <option value="">Padrão</option>
        <option value="name-asc">Nome alfabética (A-Z)</option>
        <option value="name-desc">Nome alfabética (Z-A)</option>
        <option value="score-asc">Score crescente</option>
        <option value="score-desc">Score decrescente</option>
        </select>
    </div>  
</template>
