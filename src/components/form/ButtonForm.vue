<template>
  <Teleport to="body">
    <button
      class="px-4 py-2 border block rounded fixed bottom-2 w-[96vw] right-[1.5vw] md:w-1/2 md:right-1/4 lg:w-[26vw] lg:right-[37vw] transition-all duration-150"
      :class="useQrStore().alert_message.length === 0 ? 'bg-green-400 hover:bg-green-300 hover:outline-2 hover:outline outline-green-400' : 'bg-red-400 text-white hover:bg-red-500 cursor-not-allowed opacity-40'"
      :disabled="useQrStore().alert_message.length !== 0"
      @click="emit('generateQr')"
    >
      Générer
    </button>
  </Teleport>
</template>

<script lang="ts" setup>
import { useQrStore } from '@/stores/QrStore'

const emit = defineEmits<{
  (e: 'generateQr'): void;
}>()

</script>