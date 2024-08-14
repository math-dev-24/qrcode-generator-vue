<template>
  <aside
    class="
    container mx-auto border my-2 p-2 md:p-6 rounded-l drop-shadow hover:drop-shadow bg-white col-span-8
    grid md:grid-cols-6 gap-0.5 md:gap-2
  "
  >
    <div
      v-for="mode in MODE"
      :key="mode.name"
      :class="qrStore.currentQr.type === mode.name ? 'bg-stone-700 text-white' : 'hover:bg-stone-200 bg-stone-50 hover:outline-2 hover:outline outline-stone-400'"
      class="text-xs md:text-base rounded border cursor-pointer p-0.5 md:p-2 transition-all duration-150 text-center font-semibold"
      @click="setType(mode.name)"
    >
      {{ mode.emoji }} {{ mode.label }}
    </div>
  </aside>
</template>
<script setup lang="ts">
import { MODE } from '@/shared/data/data'
import { useQrStore } from '@/stores/QrStore'
import type { QrType } from '@/shared/interface/QrInterface'


const qrStore = useQrStore()


function setType(type: QrType) {
  qrStore.updateMode(type)
  qrStore.resetAlert()
  qrStore.is_generated = false
  qrStore.closeAllShow()
}
</script>