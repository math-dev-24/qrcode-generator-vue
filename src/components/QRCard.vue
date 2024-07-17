<template>
  <div class="border rounded py-2 px-4 relative hover:outline-2 hover:outline outline-stone-400 bg-white">
    <h3 class="text-xl text-center my-2 font-bold">Card N°{{ qr.id.slice(0,3) }}</h3>
    <QRCODE :qr="qr" />
    <div class="text-sm p-2 border rounded mt-2 text-stone-600">
      <p><span>Type :</span> {{ qr.type }}</p>
      <p><span>Créer le</span> {{getDate(qr.created_at)}}</p>
      <p><span>Longueur :</span> {{qr.value.length}}</p>
    </div>
    <TrashIcon class="size-6 text-red-500 absolute top-4 right-4 cursor-pointer font-bold hover:scale-110 hover:text-red-600 transition-all duration-300" @click="useQrStore().deleteQr(qr)" />
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'
import type { QrInterface } from '@/shared/interface/QrInterface'
import { useQrStore } from '@/stores/QrStore'
import QRCODE from './QRCODE.vue'
import moment from 'moment'
import { TrashIcon } from '@heroicons/vue/24/outline'

defineProps<{
  qr: QrInterface
}>()

function getDate(date: string) {
  return moment(date).format('DD/MM/YYYY à HH:mm')
}


</script>