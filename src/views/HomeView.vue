<template>
  <Mode />
  <section
    class="container mx-auto border my-2 p-2 md:p-6 rounded drop-shadow hover:drop-shadow bg-white">
    <h2 class="font-bold mb-2 md:mb-4 text-stone-600">
      <span v-if="qrStore.currentQr.type === 'scanQr'">Télécharger un QR Code :</span>
      <span v-else>Les données :</span>
    </h2>
    <div class="p-4 border rounded my-4 hover:outline-2 hover:outline outline-stone-400">
      <Component :is="currentComponent" @generateQr="generateQr"/>
    </div>
    <Errors />
  </section>
  <section
    v-if="qrStore.currentQr.type !== 'scanQr'"
    class="container mx-auto border my-2 p-2 md:p-6 rounded drop-shadow hover:drop-shadow bg-white"
  >
    <h2 class="font-bold mb-2 text-stone-600">Styliser simplement :</h2>
    <DesignList />
    <Option />
  </section>
  <QRHomeGenerated />
</template>

<script lang="ts" setup>
import { useQrStore } from '@/stores/QrStore'
import Url from '@/components/form/Url.vue'
import Text from '@/components/form/Text.vue'
import Email from '@/components/form/Email.vue'
import Sms from '@/components/form/Sms.vue'
import Vcard from '@/components/form/Vcard.vue'
import Wifi from '@/components/form/Wifi.vue'
import Paypal from '@/components/form/Paypal.vue'
import Appel from '@/components/form/Appel.vue'
import Event from '@/components/form/Event.vue'
import Social from '@/components/form/Social.vue'
import QRHomeGenerated from '@/components/qrcode/QRHomeGenerated.vue'
import Mode from '@/components/Mode.vue'
import DesignList from '@/components/form/DesignList.vue'
import Option from '@/components/form/Option.vue'
import Errors from '@/components/Errors.vue'
import Lecture from '@/components/form/Lecture.vue'
import { computed } from 'vue'

const qrStore = useQrStore()

function generateQr(text: string) {
  qrStore.addQr(text)
}

const componentsMap: Record<string, any> = {
  url: Url,
  vcard: Vcard,
  text: Text,
  email: Email,
  sms: Sms,
  wifi: Wifi,
  paypal: Paypal,
  call: Appel,
  event: Event,
  social: Social,
  scanQr: Lecture,
}

const currentComponent = computed(() => {
  return componentsMap[qrStore.currentQr.type] || 'div'
})


</script>