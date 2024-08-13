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
      :download="download"
      myclass="img-qr"
      imgclass="img-qr"
      downloadButton="btn-download"
      :downloadOptions="{ name: 'qrcode', extension: 'png' }"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import QRCodeVue3 from "qrcode-vue3";
import type { OptionsGradient, OptionsGradientType, QrInterface } from '@/shared/interface/QrInterface'

const { qr, download } = defineProps<{
  qr: QrInterface,
  download: boolean
}>()


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