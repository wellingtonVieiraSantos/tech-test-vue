<script setup lang="ts">
const emit = defineEmits(['search'])

const search = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('search', target.value)
}
</script>

<template>
    <div class="relative w-full lg:w-100">
    <input type="text" @input="search($event)" placeholder="Procurar por ID, EAN ou Nome" class="w-full lg:w-100 p-2 pl-2 pr-10 border border-slate-300 rounded"/>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 115.196 5.196a7.5 7.5 0 0110.607 10.607z" />
    </svg>
    </div>
</template>