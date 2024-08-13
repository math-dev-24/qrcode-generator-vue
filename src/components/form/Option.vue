<template>
  <section class="border p-4 mt-6 rounded">
    <h3
      class="font-bold cursor-pointer flex items-center text-stone-500 hover:text-black gap-2"
      @click="qrStore.goShowOptions()"
    >
      <WrenchScrewdriverIcon class="size-4" />
      <span>Options</span>
    </h3>
    <div class="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-4" v-show="qrStore.show_options">
      <div class="form_group">
        <label for="taille">Taille :</label>
        <span class="info">Taille du QR code</span>
        <input id="taille" v-model="qrStore.currentQr.size" max="10" min="0" type="number" />
      </div>
      <div class="form_group">
        <label id="margin" for="margin">Marge :</label>
        <span class="info">Marge entre bordure et cube</span>
        <input id="margin" v-model="qrStore.currentQr.margin" max="10" min="0" type="number" />
      </div>
      <div class="form_group col-span-2">
        <label for="rounded">Type de point :</label>
        <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 items-center">
          <div
            v-for="i in QrConstRounded"
            :key="i" @click="setRounded(i)"
            class="border p-2 rounded bg-white"
            :class="qrStore.currentQr.dotsOptions.type === i ? 'border-stone-700 border-2' : 'hover:outline outline-1 outline-gray-500'"
          >
            <QRCODE :qr="getRounded(i)" :download="false" />
            <div class="text-center text-xs text-gray-600">{{i}}</div>
          </div>
        </div>
        <SelectModeColor
          v-model:mode="qrStore.currentQr.dotsOptions.gradient.mode"
          v-model:color1="qrStore.currentQr.dotsOptions.gradient.color1"
          v-model:color2="qrStore.currentQr.dotsOptions.gradient.color2"
          v-model:rotate="qrStore.currentQr.dotsOptions.gradient.rotation"
          v-model:percent_color2="qrStore.currentQr.dotsOptions.gradient.percent_color2"
          v-model:color3="qrStore.currentQr.dotsOptions.gradient.color3"
        />
      </div>
      <div class="form_group col-span-2">
        <label for="square">Design des bords du coins :</label>
        <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 items-center">
          <div
            v-for="i in QrConstConersSquare"
            :key="i" @click="setConersSquare(i)"
            class="border p-2 rounded"
            :class="qrStore.currentQr.conersSquareOptions.type === i ? 'border-stone-700 border-2' : 'hover:outline outline-1 outline-gray-500'"
          >
            <QRCODE :qr="getConersSquare(i)" :download="false" />
            <div class="text-center text-xs text-gray-600">{{i}}</div>
          </div>
        </div>
        <SelectModeColor
          v-model:mode="qrStore.currentQr.conersSquareOptions.gradient.mode"
          v-model:color1="qrStore.currentQr.conersSquareOptions.gradient.color1"
          v-model:color2="qrStore.currentQr.conersSquareOptions.gradient.color2"
          v-model:rotate="qrStore.currentQr.conersSquareOptions.gradient.rotation"
          v-model:percent_color2="qrStore.currentQr.conersSquareOptions.gradient.percent_color2"
          v-model:color3="qrStore.currentQr.conersSquareOptions.gradient.color3"
        />
      </div>
      <div class="form_group col-span-2">
        <label for="dotCorner">Design des points aux coins :</label>
        <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 items-center">
          <div
            v-for="i in QrConstConersDots"
            :key="i" @click="setConersDots(i)"
            class="border p-2 rounded"
            :class="qrStore.currentQr.conersDotsOptions.type === i ? 'border-stone-700 border-2' : 'hover:outline outline-1 outline-gray-500'"
          >
            <QRCODE :qr="getConersDots(i)" :download="false" />
            <div class="text-center text-xs text-gray-600">{{i}}</div>
          </div>
        </div>
        <SelectModeColor
          v-model:mode="qrStore.currentQr.conersDotsOptions.gradient.mode"
          v-model:color1="qrStore.currentQr.conersDotsOptions.gradient.color1"
          v-model:color2="qrStore.currentQr.conersDotsOptions.gradient.color2"
          v-model:rotate="qrStore.currentQr.conersDotsOptions.gradient.rotation"
          v-model:percent_color2="qrStore.currentQr.conersDotsOptions.gradient.percent_color2"
          v-model:color3="qrStore.currentQr.conersDotsOptions.gradient.color3"
        />
      </div>
      <div class="form_group col-span-2">
        <label for="background">Couleur de fond :</label>
        <SelectModeColor
          v-model:mode="qrStore.currentQr.backgroundOptions.gradient.mode"
          v-model:color1="qrStore.currentQr.backgroundOptions.gradient.color1"
          v-model:color2="qrStore.currentQr.backgroundOptions.gradient.color2"
          v-model:rotate="qrStore.currentQr.backgroundOptions.gradient.rotation"
          v-model:percent_color2="qrStore.currentQr.backgroundOptions.gradient.percent_color2"
          v-model:color3="qrStore.currentQr.backgroundOptions.gradient.color3"
        />
      </div>
      <div class="form_group col-span-2">
        <label for="background">Image :</label>
        <input id="image" type="file" class="m-1 p-1" @change="getFile($event)" />
        <div class="flex flex-wrap gap-2"> Pré défini :
          <div
            v-for="i in listImage" :key="i.name"
            @click="setImage(i.image)"
            class="text-gray-300 cursor-pointer"
            :class="qrStore.currentQr.image == i.image ? 'text-gray-500' : ''"
          >
            {{ i.name }}
          </div>
        </div>
        <span
          @click="setImage('')"
          class="text-red-400 hover:text-red-500 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><g fill="none" stroke="currentColor"><path fill="currentColor" stroke-linejoin="round" stroke-width="4.302" d="M44.782 24.17L31.918 7.1L14.135 20.5L27.5 37l3.356-2.336z"/><path stroke-linejoin="round" stroke-width="4.302" d="m27.5 37l-3.839 3.075l-10.563-.001l-2.6-3.45l-6.433-8.536L14.5 20.225"/><path stroke-linecap="round" stroke-width="4.5" d="M13.206 40.072h31.36"/></g></svg>
        </span>
        <div v-if="qrStore.currentQr.image" class="flex items-center justify-start gap-2">
          <span>Preview :</span>
          <img :src="qrStore.currentQr.image" class="w-8 h-8 object-cover" alt="temporyQrCode" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defaultQr, useQrStore } from '@/stores/QrStore'
import { WrenchScrewdriverIcon } from '@heroicons/vue/24/outline'
import SelectModeColor from '@/components/input/SelectModeColor.vue'
import {
  QrConstConersDots,
  QrConstConersSquare,
  QrConstRounded,
  type QrInterface, type QrTypeConersDots, type QrTypeConersSquare, type QrTypeRounded
} from '@/shared/interface/QrInterface'
import QRCODE from '@/components/qrcode/QRCODE.vue'
import { onMounted } from 'vue'

const listImage = [
  { name: "paypal", image: 'logo/paypal.svg', },
  { name: "google", image: 'logo/google.svg', },
  { name: "apple", image: 'logo/apple.svg', },
  { name: "linkedin", image: 'logo/linkedin.svg',},
  {name: "phone", image: 'logo/phone.svg', },
  {name: "twitter", image: 'logo/twitter.svg', },
  {name: 'instagram', image: 'logo/instagram.svg', },
  {name: 'github', image: 'logo/github.svg', },
  {name: "youtube", image: 'logo/youtube.svg', },
]

const qrStore = useQrStore()

const getFile = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      qrStore.currentQr.image = reader.result as string
    }
  }
}

const setImage = (image: string) => {
  qrStore.currentQr.image = image
  const file = document.getElementById("image") as HTMLInputElement
  file.value = ""
}

const size: number = 100

function getConersDots(type: QrTypeConersDots): QrInterface {
  return {
    ...defaultQr,
    size: size,
    conersDotsOptions: {
      type: type,
      gradient: {
        mode: "single",
        color1: "#ff0000",
        color2: "#ff0000",
        color3: "#ff0000",
        percent_color2: 50,
        rotation: 0,
      }
    }
  }
}
function setConersDots(conersDotsOptions: QrTypeConersDots) {
  qrStore.currentQr.conersDotsOptions.type = conersDotsOptions
}

function getConersSquare(type: QrTypeConersSquare): QrInterface {
  return {
    ...defaultQr,
    size: size,
    conersSquareOptions: {
      type: type,
      gradient: {
        mode: "single",
        color1: "#ff0000",
        color2: "#ff0000",
        color3: "#ff0000",
        percent_color2: 50,
        rotation: 0,
      }
    }
  }
}
function setConersSquare(conersSquareOptions: QrTypeConersSquare) {
  qrStore.currentQr.conersSquareOptions.type = conersSquareOptions
}

function getRounded(type: QrTypeRounded): QrInterface {
  return {
    ...defaultQr,
    size: size,
    dotsOptions: {
      type: type,
      gradient: {
        mode: "single",
        color1: "#ff0000",
        color2: "#ff0000",
        color3: "#ff0000",
        percent_color2: 50,
        rotation: 0,
      }
    }
  }
}
function setRounded(rounded: QrTypeRounded) {
  qrStore.currentQr.dotsOptions.type = rounded
}

</script>