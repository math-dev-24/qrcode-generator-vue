<template>
  <div class="py-6">
    <canvas ref="canvas" class="m-auto hover:scale-105 hover:shadow-lg transition-all duration-150"></canvas>
    <span
      @click="downloadPNG()"
      class="hover:underline text-stone-500 hover:text-black text-sm cursor-pointer mt-2 text-center w-1/3 m-auto flex justify-center items-center"
    >
      <ArrowDownOnSquareIcon class="size-4" />
      Download
    </span>
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode';
import { onMounted, ref, defineProps } from 'vue'
import type { QrInterface } from '@/shared/interface/QrInterface'
import { ArrowDownOnSquareIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  qr: QrInterface
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
const vcard = props.qr.value

onMounted(() => {
  generateQRCode()
  if(canvas.value){
    canvas.value.style.width = '170px'
    canvas.value.style.height = '170px'
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
        errorCorrectionLevel: 'H'
      }
    )
  }
}

function downloadPNG() {
  if (canvas.value) {
    const url = canvas.value.toDataURL('image/svg')
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = url
    link.click()
  }
}
</script>