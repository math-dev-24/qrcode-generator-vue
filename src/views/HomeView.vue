<template>
  <div>
    <section
      class="container mx-auto border my-2 p-2 md:my-6 md:p-6 rounded-l drop-shadow hover:drop-shadow bg-white col-span-8">
      <div class="grid md:grid-cols-6 gap-0.5 md:gap-2">
        <div
          v-for="mode in MODE"
          :key="mode.name"
          :class="qrStore.currentQr.type === mode.name ? 'bg-stone-700 text-white' : 'hover:bg-stone-200 bg-stone-50 hover:outline-2 hover:outline outline-stone-400'"
          class="text-xs md:text-base rounded border cursor-pointer p-0.5 md:p-2 transition-all duration-150 text-center font-semibold"
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
        <template v-else-if="qrStore.currentQr.type === 'social'">
          <Social @generateQr="generateQr" />
        </template>
        <template v-else>
          <div>Aucun type de QR</div>
        </template>
      </div>
      <aside
        v-if="qrStore.alert_message.length > 0"
        class="p-4 border border-red-700 rounded hover:drop-shadow bg-red-50 text-red-600 hover:outline-2 hover:outline outline-red-400"
      >
        <ul class="list-disc">
          <li v-for="message in qrStore.alert_message" :key="message" class="text-red-600 font-semibold">- {{ message }}
          </li>
        </ul>
      </aside>
    </section>
  </div>
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

<script lang="ts" setup>
import { MODE } from '@/shared/data/data'
import { useQrStore } from '@/stores/QrStore'
import Url from '@/components/form/Url.vue'
import Text from '@/components/form/Text.vue'
import Email from '@/components/form/Email.vue'
import Sms from '@/components/form/Sms.vue'
import Vcard from '@/components/form/Vcard.vue'
import type { QrType } from '@/shared/interface/QrInterface'
import QRCODE from '@/components/qrcode/QRCODE.vue'
import { watch } from 'vue'
import Wifi from '@/components/form/Wifi.vue'
import Paypal from '@/components/form/Paypal.vue'
import Appel from '@/components/form/Appel.vue'
import Event from '@/components/form/Event.vue'
import Social from '@/components/form/Social.vue'

const qrStore = useQrStore()


function setType(type: QrType) {
  qrStore.currentQr.type = type
  qrStore.resetAlert()
  qrStore.is_generated = false
  qrStore.closeAllShow()
}

function generateQr(text: string) {
  qrStore.addQr(text)
}

</script>