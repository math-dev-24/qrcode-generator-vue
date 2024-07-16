<template>
  <div class="border rounded-xl py-2 px-4">
    <span>Card N°{{ qr.id.slice(-4) }}</span>
    <QRCODE :qr="qr" />
    <div @click="useQrStore().deleteQr(qr)" class="text-red-500 cursor-pointer">Delete</div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'
import type { QrInterface } from '@/shared/interface/QrInterface'
import { useQrStore } from '@/stores/QrStore'
import QRCODE from './QRCODE.vue'

defineProps<{
  qr: QrInterface
}>()


</script>