<template>
  <div class="py-6 relative">
    <QRCodeVue3
      :height="qr.size"
      :width="qr.size"
      :value="qr.value"
      :margin="qr.margin || undefined"
      :image="qr.image"
      :imageOptions="{ hideBackgroundDots: true, imageSize: 0.2, margin: 0, crossOrigin: 'anonymous' }"
      :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
      :dotsOptions="getOptionsWithType(qr.dotsOptions)"
      :cornersSquareOptions="getOptionsWithType(qr.conersSquareOptions)"
      :cornersDotOptions="getOptionsWithType(qr.conersDotsOptions)"
      :backgroundOptions="getBackgroundOptions(qr.backgroundOptions.gradient)"
      :download="true"
      myclass="img-qr"
      imgclass="img-qr"
      downloadButton="btn-download"
      :downloadOptions="{ name: 'qrcode', extension: 'png' }"
    />
    <div @click="qrCodeStore.is_generated=false" class="absolute top-1 right-1 text-red-500 cursor-pointer hidden md:block">
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import QRCodeVue3 from "qrcode-vue3";
import type { OptionsGradient, OptionsGradientType, QrInterface } from '@/shared/interface/QrInterface'
import { useQrStore } from '@/stores/QrStore'

const { qr } = defineProps<{
  qr: QrInterface
}>()

const qrCodeStore = useQrStore()

const getOptionsWithType = (qr: OptionsGradientType) => {
  let tmp = {
    type: qr.type,
    color: qr.gradient.color1,
  }
  if(qr.gradient.mode === "multiple"){
    const rotate: number = qr.gradient.rotation > 100 ? 100 : qr.gradient.rotation < 0 ? 0 : qr.gradient.rotation
    // @ts-ignore
  return {...tmp, gradient: {
      type: "linear",
      colorStops: [
        { offset: 0, color: qr.gradient.color1},
        { offset: 1, color: qr.gradient.color2 },
      ],
      rotation: rotate }
    }
  }
  return tmp
}

const getBackgroundOptions = (qr: OptionsGradient) => {
  const rotate: number = qr.rotation > 100 ? 100 : qr.rotation < 0 ? 0 : qr.rotation
  let tmp = {
    color: qr.color1,
    gradient: null
  }
  if(qr.mode === "multiple"){
    // @ts-ignore
    return {...tmp, gradient: {
      type: "linear",
      colorStops: [
        { offset: 0, color: qr.color1},
        { offset: 1, color: qr.color2 },
      ],
      rotation: rotate }
    }
  }
  return tmp
}
</script>