<template>
  <section class="border p-4 mt-6 rounded">
    <h3
      class="font-bold cursor-pointer flex items-center text-stone-500 hover:text-black gap-2"
      @click="showOptions = !showOptions"
    >
      <WrenchScrewdriverIcon class="size-4" />
      <span>Options</span>
    </h3>
    <div class="grid grid-cols-2 gap-4" v-if="showOptions">
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
        <select id="rounded" v-model="qrStore.currentQr.dotsOptions.type" class="m-1 p-1">
          <option v-for="i in QrConstRounded" :value="i" :key="i">{{i}}</option>
        </select>
        <SelectModeColor
          v-model:mode="qrStore.currentQr.dotsOptions.gradient.mode"
          v-model:color1="qrStore.currentQr.dotsOptions.gradient.color1"
          v-model:color2="qrStore.currentQr.dotsOptions.gradient.color2"
          v-model:rotate="qrStore.currentQr.dotsOptions.gradient.rotation"
        />
      </div>
      <div class="form_group col-span-2">
        <label for="square">Design square :</label>
        <select id="square" v-model="qrStore.currentQr.conersSquareOptions.type" class="m-1 p-1">
          <option v-for="i in QrConstConersSquare" :value="i" :key="i">{{i}}</option>
        </select>
        <SelectModeColor
          v-model:mode="qrStore.currentQr.conersSquareOptions.gradient.mode"
          v-model:color1="qrStore.currentQr.conersSquareOptions.gradient.color1"
          v-model:color2="qrStore.currentQr.conersSquareOptions.gradient.color2"
          v-model:rotate="qrStore.currentQr.conersSquareOptions.gradient.rotation"
        />
      </div>
      <div class="form_group col-span-2">
        <label for="dotCorner">conersDotsOptions</label>
        <select class="m-1 p-1" v-model="qrStore.currentQr.conersDotsOptions.type">
          <option v-for="i in QrConstConersDots" :value="i" :key="i">{{i}}</option>
        </select>
      </div>
      <div class="form_group col-span-2">
        <label for="background">Couleur de fond :</label>
        <SelectModeColor
          v-model:mode="qrStore.currentQr.backgroundOptions.gradient.mode"
          v-model:color1="qrStore.currentQr.backgroundOptions.gradient.color1"
          v-model:color2="qrStore.currentQr.backgroundOptions.gradient.color2"
          v-model:rotate="qrStore.currentQr.backgroundOptions.gradient.rotation"
        />
      </div>
      <div class="form_group col-span-2">
        <label for="background">Image :</label>
        <input id="image" type="file" class="m-1 p-1" @change="getFile($event)" />
        <div class="flex flex-wrap gap-2">
          <div
            v-for="i in listImage" :key="i.name"
            @click="setImage(i.image)"
            class="text-gray-300 cursor-pointer"
            :class="qrStore.currentQr.image == i.image ? 'text-gray-500' : ''"
          >
            {{ i.name }}
          </div>
        </div>
        <img v-if="qrStore.currentQr.image" :src="qrStore.currentQr.image" class="w-8 h-8 object-cover" />
        <div @click="setImage('')" class="text-red-500 cursor-pointer">Supprimer</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useQrStore } from '@/stores/QrStore'
import { ref } from 'vue'
import { WrenchScrewdriverIcon } from '@heroicons/vue/24/outline'
import SelectModeColor from '@/components/input/SelectModeColor.vue'
import { QrConstConersDots, QrConstConersSquare, QrConstRounded } from '@/shared/interface/QrInterface'

const listImage = [
  { name: "paypal", image: 'paypal.svg', },
  { name: "google", image: 'google.svg', },
  { name: "apple", image: 'apple.svg', },
  { name: "linkedin", image: 'linkedin.svg',},
  {name: "phone", image: 'phone.svg', },
  {name: "twitter", image: 'twitter.svg', },
  {name: 'instagram', image: 'instagram.svg', },
  {name: 'github', image: 'github.svg', },
]

const qrStore = useQrStore()
const showOptions = ref<boolean>(false)

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

</script>