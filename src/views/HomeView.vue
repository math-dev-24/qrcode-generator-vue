<template>
  <div class="grid grid-cols-12 gap-2">
    <section class="container mx-auto border my-6 p-6 rounded-l drop-shadow hover:drop-shadow bg-white col-span-8">
      <div class="grid grid-cols-6 gap-4">
        <div
          v-for="mode in MODE"
          :key="mode.name"
          :class="qrStore.currentQr.type === mode.name ? 'bg-stone-700 text-white' : 'hover:bg-stone-200 bg-stone-50 hover:outline-2 hover:outline outline-stone-400'"
          class="text-sm md:text-base rounded border cursor-pointer p-2 transition-all duration-150 text-center font-semibold"
          @click="setType(mode.name)"
        >
          {{ mode.emoji }} {{ mode.label }}
        </div>
      </div>
      <div class="p-4 border rounded my-4 hover:outline-2 hover:outline outline-stone-400">
        <template v-if="qrStore.currentQr.type === 'url'">
          <Url @generateQr="generateQr" />
        </template>
        <template v-else-if="qrStore.currentQr.type === 'vcard'">
          <Vcard @generateQr="generateQr" />
        </template>
        <template v-else-if="qrStore.currentQr.type === 'text'">
          <Text @generateQr="generateQr" />
        </template>
        <template v-else-if="qrStore.currentQr.type === 'email'">
          <Email @generateQr="generateQr" />
        </template>
        <template v-else-if="qrStore.currentQr.type === 'sms'">
          <Sms @generateQr="generateQr" />
        </template>
        <template v-else-if="qrStore.currentQr.type === 'wifi'">
          <Wifi @generateQr="generateQr" />
        </template>
        <template v-else-if="qrStore.currentQr.type === 'paypal'">
          <Paypal @generateQr="generateQr" />
        </template>
        <template v-else-if="qrStore.currentQr.type === 'call'">
          <Appel @generateQr="generateQr" />
        </template>
        <template v-else-if="qrStore.currentQr.type === 'event'">
          <Event @generateQr="generateQr" />
        </template>
        <template v-else>
          <div>Aucun type de QR</div>
        </template>
      </div>
      <aside
        v-if="qrStore.alert_message.length > 0"
        class="p-4 m-2 border border-red-700 rounded hover:drop-shadow bg-red-50 text-red-600 hover:outline-2 hover:outline outline-red-400"
      >
        <ul class="list-disc">
          <li v-for="message in qrStore.alert_message" :key="message" class="text-red-600 font-bold">- {{ message }}
          </li>
        </ul>
      </aside>
    </section>
    <aside
      class="container mx-auto border my-6 p-6 rounded-r hover:outline-2 hover:outline outline-stone-400 col-span-4 bg-white drop-shadow">
      <QRCODE v-if="qrStore.is_generated && qrStore.generateQr" :qr="qrStore.generateQr" />
      <div v-else
           class="text-center border-2 h-[200px] w-[200px] bg-stone-50 rounded flex flex-col items-center justify-center m-auto"></div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
import { MODE } from '@/shared/data/data'
import { useQrStore } from '@/stores/QrStore'
import Url from '@/components/form/Url.vue'
import Text from '@/components/form/Text.vue'
import Email from '@/components/form/Email.vue'
import Sms from '@/components/form/Sms.vue'
import Vcard from '@/components/form/Vcard.vue'
import type { QrType } from '@/shared/interface/QrInterface'
import QRCODE from '@/components/QRCODE.vue'
import { watch } from 'vue'
import Wifi from '@/components/form/Wifi.vue'
import Paypal from '@/components/form/Paypal.vue'
import Appel from '@/components/form/Appel.vue'
import Event from '@/components/form/Event.vue'

const qrStore = useQrStore()


function setType(type: QrType) {
  qrStore.currentQr.type = type
  qrStore.resetAlert()
  qrStore.is_generated = false
}

watch(qrStore.currentQr, () => {
  if (qrStore.currentQr.margin < 0 || qrStore.currentQr.margin > 10) {
    qrStore.addAlert(`Marge doit être compris entre 0 et 10 !`)
  } else {
    qrStore.removeAlert(`Marge doit être compris entre 0 et 10 !`)
  }
})

function generateQr(text: string) {
  qrStore.addQr(text)
}

</script>