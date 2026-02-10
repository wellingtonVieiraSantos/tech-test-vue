<script setup lang="ts">
import BaseCard from '../../base/BaseCard.vue';

defineProps<{ productsWithImage: number, productsUnvailable: number, productsOk: number, averageScore: number }>()

</script>

<template>
  <div class="flex lg:flex-row flex-col gap-4 w-full justify-between mb-4">
    <BaseCard class="flex-1 p-2">
      <template #header>
        <h2 class="text-lg font-semibold">Produtos com imagem</h2>
        <span class="text-xs text-slate-500">Total de produtos com imagem</span>
      </template>
      <template #content>
        <p>{{ productsWithImage }}</p>
      </template>
    </BaseCard>
    <BaseCard class="flex-1 p-2">
      <template #header>
        <h2 class="text-lg font-semibold">Produtos indisponíveis</h2>
        <span class="text-xs text-slate-500">Total de produtos indisponíveis</span>
      </template>
      <template #content>
        <p>{{ productsUnvailable }} </p>
      </template>
    </BaseCard>
    <BaseCard class="flex-1 p-2">
      <template #header>
        <h2 class="text-lg font-semibold">Produtos disponíveis</h2>
        <span class="text-xs text-slate-500">Total de produtos disponíveis</span>
      </template>
      <template #content>
        <p>{{ productsOk }}</p>
      </template>
    </BaseCard>
    <BaseCard class="flex-1 p-2">
      <template #header>
        <h2 class="text-lg font-semibold">Média de score</h2>
        <span class="text-xs text-slate-500">Média da relação entre preço e avaliação dos produtos</span>
      </template>
      <template #content>
        <p>{{ (averageScore * 100).toFixed(2) }}%</p>
      </template>
    </BaseCard>
    </div>
</template>