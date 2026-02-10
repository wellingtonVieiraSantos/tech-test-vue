<script setup lang="ts">

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'danger' | 'success' | 'warning'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'default',
    type: 'button',
    disabled: false,
  }
)
</script>

<template>
  <button 
    :class='`text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer disabled:bg-gray-400
    ${props.variant === "default" ? "bg-blue-500 hover:bg-blue-600" : ""}
    ${props.variant === "danger" ? "bg-red-700 hover:bg-red-800" : ""} 
    ${props.variant === "success" ? "bg-green-700 hover:bg-green-800" : ""} 
    ${props.variant === "warning" ? "bg-yellow-700 hover:bg-yellow-800" : ""}
    ${props.disabled ? "cursor-not-allowed" : ""}`' 
    :disabled="props.disabled"
    :type="props.type"
    @click="emit('click', $event)"
    :aria-disabled="props.disabled"
    :aria-label="props.variant === 'default' ? 'Botão padrão' : props.variant === 'danger' ? 'Botão de perigo' : props.variant === 'success' ? 'Botão de sucesso' : props.variant === 'warning' ? 'Botão de aviso' : 'Botão'"
  >
    <slot />
  </button>
</template>

