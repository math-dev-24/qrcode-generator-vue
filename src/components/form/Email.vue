<template>
  <div class="bg-stone-300 py-6 px-4 rounded-xl my-6 drop-shadow">
    <div class="grid grid-cols-2 gap-4">
      <div class="form_group">
        <label for="email" class="block my-1 font-bold">Email :</label>
        <input type="email" id="email" v-model="currentQr.email"/>
      </div>
      <div class="form_group">
        <label for="subject" class="block my-1 font-bold">Sujet :</label>
        <input type="text" id="subject" v-model="currentQr.subject"/>
      </div>
      <div class="form_group col-span-2">
        <label for="content" class="block my-1 font-bold">Entrez votre texte :</label>
        <textarea type="text" id="content" v-model="currentQr.content"/>
      </div>
      <div class="form_group">
        <label for="margin" id="margin" class="block my-1 font-bold">Marge :</label>
        <input type="number" id="margin" v-model="currentQr.margin" min="0" max="10"/>
      </div>
      <div></div>
      <div class="form_group">
        <label for="background" class="block my-1 font-bold">Couleur des cubes :</label>
        <div>
          <input type="color" id="background" v-model="currentQr.background"/>
          <span class="text-center italic mx-1">{{ currentQr.background }}</span>
        </div>
      </div>
      <div class="form_group">
        <label for="foreground" class="block my-1 font-bold">Couleur de fond :</label>
        <div>
          <input type="color" id="foreground" v-model="currentQr.foreground"/>
          <span class="text-center italic mx-1">{{ currentQr.foreground }}</span>
        </div>
      </div>
    </div>
    <div class=" mt-16 flex flex-col items-center" >
      <ul>
        <li v-for="message in alert_message" class="text-red-600 font-bold" :key="message">{{ message }}</li>
      </ul>
      <button
        @click="addQr(currentQr)"
        :disabled="alert_message.length > 0"
        :class="alert_message.length > 0 ? 'bg-red-700 text-white' : 'bg-stone-600 text-white hover:bg-stone-500'"
        class="px-2 py-1 rounded transition-all duration-150 w-2/5"
      >
        Generate
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQrStore } from '@/stores/QrStore'
import { nanoid } from 'nanoid'
import type { QrInterface } from '@/shared/interface/QrInterface'
import type { EmailInterface } from '@/shared/interface/EmailInterface'
import { mailto } from '@/shared/Mailto'

const alert_message = ref<string[]>([])
const currentQr = ref<EmailInterface>({
  email: "john.doe@gmail.com",
  subject: "Hello",
  content: "Lorem ipsum dolor sit amen",
  margin: 1,
  background: "#ffffff",
  foreground: "#000000",
})



const addQr = (qr: EmailInterface) => {
  const email_str: string = mailto(qr.email, qr.subject, qr.content)
  const tmp_qr_code: QrInterface = {
    id: nanoid(),
    value: email_str,
    margin: qr.margin,
    background: qr.background,
    foreground: qr.foreground,
    type: "email"
  }
  useQrStore().addQr(tmp_qr_code)
}

</script>