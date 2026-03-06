<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const emit = defineEmits(['close'])

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    closeButtonLabel: {
        type: String,
        default: 'Close'
    },
    modalAriaLabel: {
        type: String,
        default: 'Modal'
    },
    modalAriaLabelledby: {
        type: String,
        default: ''
    },
    modalAriaDescribedby: {
        type: String,
        default: ''
    }
})

const modalRef = ref<HTMLDivElement | null>(null)

watch(() => props.isOpen, async (opened) => {
  if (opened) {
    await nextTick() 
    modalRef.value?.focus() 
  }
}, { immediate: true })

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})

</script>

<template>
  <div v-if="props.isOpen" class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" @click="emit('close')" data-slot="modal-overlay"/>
  <div 
    class="flex flex-col gap-8 fixed top-1/2 left-1/2 -translate-1/2 z-50 bg-white p-2 py-3 rounded shadow-lg lg:w-1/2 w-full justify-center items-center animate-in fade-in zoom-in duration-300" 
    v-if="props.isOpen" 
    role="dialog" 
    ref="modalRef"
    tabindex="-1"
    :aria-labelledby="props.modalAriaLabelledby" 
    :aria-describedby="props.modalAriaDescribedby" 
    :aria-label="props.modalAriaLabel" 
    aria-modal="true"
    data-slot="modal"
  > 
    <header class="flex flex-col gap-4 text-center" data-slot="modal-header">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.3" stroke="black" class="size-9 p-1 absolute top-2 right-2 border border-slate-300 rounded cursor-pointer" @click="emit('close')">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <slot name="header"/>
    </header>
    <section class="w-full flex flex-col gap-4 justify-center" data-slot="modal-content" >
      <slot name="content"/>
    </section>
    <footer class="flex flex-col lg:flex-row gap-4 lg:w-1/2 w-full justify-center" data-slot="modal-footer">
      <slot name="footer"/>
    </footer>
  </div>
</template>
