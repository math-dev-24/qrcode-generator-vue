<template>
  <aside
    class="
    container mx-auto border my-2 p-2 md:p-6 rounded-l drop-shadow hover:drop-shadow bg-white"
  >
    <h2 class="font-bold mb-2 md:mb-4 text-stone-600">Type de données :</h2>
    <div class="grid md:grid-cols-6 gap-0.5 md:gap-2">
      <div
        v-for="mode in MODE"
        :key="mode.name"
        :class="qrStore.currentQr.type === mode.name ? 'bg-stone-700 text-white' : 'hover:bg-stone-200 bg-stone-50 hover:outline-2 hover:outline outline-stone-400'"
        class="text-xs md:text-base rounded border cursor-pointer p-0.5 md:p-2 transition-all duration-150 text-center font-semibold"
        @click="setType(mode.name)"
        @mouseover="tmp_mode = mode.name"
        @mouseleave="tmp_mode = qrStore.currentQr.type"
      >
        {{ mode.emoji }} {{ mode.label }}
      </div>
    </div>
    <p class="text-stone-600 text-center italic mt-4">{{ mode_description }}</p>
  </aside>
</template>
<script setup lang="ts">
import { MODE } from '@/shared/data/data'
import { useQrStore } from '@/stores/QrStore'
import type { QrType } from '@/shared/interface/QrInterface'
import { ref, computed } from 'vue'


const qrStore = useQrStore()

const tmp_mode = ref<string>(qrStore.currentQr.type)

const mode_description = computed(() => {
  const mode = MODE.find(mode => mode.name === tmp_mode.value)
  return mode?.description
})


function setType(type: QrType) {
  if(qrStore.currentQr.type === type) return

  qrStore.updateMode(type)
  qrStore.resetAlert()
  qrStore.is_generated = false
  qrStore.closeAllShow()
}
</script>