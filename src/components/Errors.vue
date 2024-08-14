<template>
  <aside
    v-if="qrStore.alert_message.length > 0"
    class="flex flex-col gap-2 p-2 border border-red-700 rounded hover:drop-shadow bg-red-50 text-red-600 outline-1 hover:outline outline-red-400"
  >
    <div v-for="message in qrStore.alert_message" :key="message" class="text-red-600 text-sm flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="M128 20a108 108 0 1 0 108 108A108.12 108.12 0 0 0 128 20m0 192a84 84 0 1 1 84-84a84.09 84.09 0 0 1-84 84m-12-80V80a12 12 0 0 1 24 0v52a12 12 0 0 1-24 0m28 40a16 16 0 1 1-16-16a16 16 0 0 1 16 16"/></svg>
      <span>{{ message }}</span>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useQrStore } from '@/stores/QrStore'

const qrStore = useQrStore()
</script>