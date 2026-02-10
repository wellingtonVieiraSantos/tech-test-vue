<script setup lang="ts">
const emit = defineEmits(['submit'])
const props = defineProps({
    isUpdateMode: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
  <form @submit.prevent="emit('submit')" class="flex flex-col md:gap-3 gap-1 w-full justify-center items-center p-4">
    <header class="flex flex-col md:gap-3 gap-1 w-full justify-center items-center" data-slot="form-header">
      <slot name="header" />
    </header>
    <section class="flex flex-col md:gap-3 gap-2 w-full justify-center items-center" data-slot="form-content">
      <slot name="content" />
    </section>
    <footer class="flex flex-col md:gap-3 gap-1 w-full justify-center items-center" data-slot="form-footer">
      <slot name="footer" />
    </footer>
  </form>
</template>