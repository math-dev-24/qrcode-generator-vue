<template>
  <div class="bg-stone-300 py-6 px-4 rounded-xl my-6 drop-shadow grid grid-cols-2 gap-4">
    <div class="form_group col-span-2">
      <label for="phone">Numéro de téléphone</label>
      <input type="text" id="phone" v-model="phone" placeholder="06123456789" />
    </div>
    <div class="form_group col-span-2">
      <label for="message">Message</label>
      <textarea type="text" id="message" v-model="message" placeholder="Bonjour, je suis un message" />
    </div>
    <div class="form_group">
      <label for="margin" id="margin" class="block my-1 font-bold">Marge :</label>
      <input type="number" id="margin" v-model="margin" min="0" max="10"/>
    </div>
    <div></div>
    <div class="form_group">
      <label for="background" class="block my-1 font-bold">Couleur des cubes :</label>
      <div>
        <input type="color" id="background" v-model="background"/>
        <span class="text-center italic mx-1">{{ background }}</span>
      </div>
    </div>
    <div class="form_group">
      <label for="foreground" class="block my-1 font-bold">Couleur de fond :</label>
      <div>
        <input type="color" id="foreground" v-model="foreground"/>
        <span class="text-center italic mx-1">{{ foreground }}</span>
      </div>
    </div>
    <button @click="addQr(phone, message)" class="bg-stone-600 text-white hover:bg-stone-500 px-2 py-1 rounded transition-all duration-150 w-2/5 m-auto col-span-2">
      Generate
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQrStore } from '@/stores/QrStore'
import { nanoid } from 'nanoid'
import type { QrInterface } from '@/shared/interface/QrInterface'
import { smsSend } from '@/shared/SmsSend'

const phone = ref<string>("06123456789")
const message = ref<string>("Bonjour, je suis un message")
const margin = ref<number>(1)
const background = ref<string>("#ffffff")
const foreground = ref<string>("#000000")

const addQr = (phone: string, message: string) => {
  const sms_str: string = smsSend(phone, message)
  const tmp_qr_code: QrInterface = {
    id: nanoid(),
    value: sms_str,
    margin: margin.value,
    background: background.value,
    foreground: foreground.value,
    type: "sms"
  }
  useQrStore().addQr(tmp_qr_code)
}

</script>