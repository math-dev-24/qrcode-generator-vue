<template>
  <div>
    <canvas ref="canvas"></canvas>
    <span @click="dowload()" class="hover:text-underline cursor-pointer mt-1 block">Download</span>
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode';
import { onMounted, ref, defineProps } from 'vue'
import type { QrInterface } from '@/shared/interface/QrInterface'

const props = defineProps<{
  qr: QrInterface
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
const vcard = props.qr.value

onMounted(() => {
  generateQRCode()
  if(canvas.value){
    canvas.value.style.width = '150px'
    canvas.value.style.height = '150px'
  }
})

function generateQRCode() {
  if (canvas.value) {
    QRCode.toCanvas(
      canvas.value,
      vcard,
      {
        color: {
          dark: props.qr.background,
          light: props.qr.foreground,
        },
        margin:props.qr.margin,
      }
    )
  }
}

function dowload() {
  if (canvas.value) {
    const url = canvas.value.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = url
    link.click()
  }
}
</script>