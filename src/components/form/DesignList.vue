<script setup lang="ts">
import { WrenchScrewdriverIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { DEFAULT_THEME, defaultTheme, type DefaultThemeInterface } from '@/shared/data/defaultTheme'
import { useQrStore } from '@/stores/QrStore'

const showDesign = ref<boolean>(false)
const tmpDesign = ref<string>("")
const qrStore = useQrStore()



function setDesign(design: DefaultThemeInterface) {
  tmpDesign.value = design.name
  qrStore.setTheme(design)
}

</script>

<template>
  <section class="border p-4 mt-6 rounded">
    <h3
      class="font-bold cursor-pointer flex items-center text-stone-500 hover:text-black gap-2"
      @click="showDesign = !showDesign"
    >
      <WrenchScrewdriverIcon class="size-4" />
      <span>Design prédéfini</span>
    </h3>
    <div class="grid grid-cols-4 gap-1" v-if="showDesign">
      <div
        @click="setDesign(defaultTheme)"
        class="border rounded bg-slate-100 p-4 flex gap-1 md:gap-2 flex-col items-center justify-center cursor-pointer hover:outline outline-1 outline-black"
      >
        Reset
      </div>
        <div
          v-for="i in DEFAULT_THEME" :key="i.name"
          @click="setDesign(i)"
          class="border rounded bg-slate-100 p-4 flex gap-1 md:gap-2 flex-col items-center justify-center cursor-pointer"
          :class="tmpDesign === i.name ? 'border-2 border-black' : 'hover:outline outline-1 outline-black'"
        >
          <span class="text-sm text-stone-500">{{ i.name }}</span>
          <img :src="i.imageDemo" class="w-32 h-32 object-cover" :alt="i.name" />
        </div>
    </div>
  </section>
</template>