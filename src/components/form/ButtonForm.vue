<template>
  <button
    class="px-4 py-2 border mx-auto my-4 block rounded"
    :class="useQrStore().alert_message.length === 0 ? 'bg-stone-200 hover:bg-stone-200 hover:outline-2 hover:outline outline-stone-400' : 'bg-red-400 text-white hover:bg-red-500 cursor-not-allowed'"
    :disabled="useQrStore().alert_message.length !== 0"
    @click="emit('generateQr')"
  >
    Générer
  </button>
</template>

<script lang="ts" setup>
import { useQrStore } from '@/stores/QrStore'

const emit = defineEmits<{
  (e: 'generateQr'): void;
}>()

</script>