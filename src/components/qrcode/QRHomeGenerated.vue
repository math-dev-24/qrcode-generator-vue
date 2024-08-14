<template>
  <aside v-if="qrStore.is_generated && qrStore.generateQr">
    <Teleport to="body">
      <div @click="qrStore.is_generated = false" class="fixed z-10 w-full h-full bg-black opacity-50 top-0 left-0"></div>
    </Teleport>
    <div
      class="fixed z-20
        md:top-1/4 md:left-1/4 md:w-2/4 md:h-2/4
        w-[94vw] h-2/3 top-1/4 left-[3vw]
        bg-white rounded drop-shadow-2xl"
    >
      <QRCODE :qr="qrStore.generateQr" :download="true" />
    </div>
  </aside>
</template>
<script setup lang="ts">
import QRCODE from '@/components/qrcode/QRCODE.vue'
import { useQrStore } from '@/stores/QrStore'

const qrStore = useQrStore()
</script>