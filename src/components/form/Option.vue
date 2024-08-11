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
      <div class="form_group col-span-2">
        <label id="margin" for="margin">Marge :</label>
        <span class="info">Marge entre bordure et cube</span>
        <input id="margin" v-model="qrStore.currentQr.margin" max="10" min="0" type="number" />
      </div>
      <div class="form_group">
        <label for="background">Couleur 1 :</label>
        <span class="info">Couleur de fond</span>
        <div>
          <input id="background" v-model="qrStore.currentQr.background" type="color" />
          <span class="text-center italic mx-1">{{ qrStore.currentQr.background }}</span>
        </div>
      </div>
      <div class="form_group">
        <label for="foreground">Couleur 2 :</label>
        <span class="info">Couleur des cubes</span>
        <div>
          <input id="foreground" v-model="qrStore.currentQr.foreground" type="color" />
          <span class="text-center italic mx-1">{{ qrStore.currentQr.foreground }}</span>
        </div>
      </div>
      <div>
        <label for="rounded">Arrondir le QR code :</label>
        <input id="rounded" v-model="qrStore.currentQr.rounded" type="checkbox" class="m-1 p-1"/>
      </div>
      <div>
        <label for="spacing">Espacement :</label>
        <input id="spacing" v-model="qrStore.currentQr.spacing" max="10" min="0" type="number" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useQrStore } from '@/stores/QrStore'
import { ref } from 'vue'
import { WrenchScrewdriverIcon } from '@heroicons/vue/24/outline'

const qrStore = useQrStore()
const showOptions = ref<boolean>(false)
</script>