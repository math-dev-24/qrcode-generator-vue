<script setup lang="ts">
import { PencilIcon } from '@heroicons/vue/24/outline'
import { onBeforeMount, ref } from 'vue'
import { DEFAULT_THEME, defaultTheme, type DefaultThemeInterface } from '@/shared/data/defaultTheme'
import { useQrStore } from '@/stores/QrStore'

const showDesign = ref<boolean>(false)
const tmpDesign = ref<string>("")
const qrStore = useQrStore()
const tmpNameDesign = ref<string>("")
const LIST_THEME = ref<DefaultThemeInterface[]>(DEFAULT_THEME)


function setDesign(design: DefaultThemeInterface) {
  tmpDesign.value = design.name
  qrStore.setTheme(design)
}

onBeforeMount(() => {
  const cookie = getCookie()
  if (cookie) {
    LIST_THEME.value = cookie
  }
})

function addDesign() {
  const tmp : DefaultThemeInterface = {
    name: tmpNameDesign.value,
    image: qrStore.currentQr.image,
    imageDemo: '',
    dotsOptions: qrStore.currentQr.dotsOptions,
    conersSquareOptions: qrStore.currentQr.conersSquareOptions,
    conersDotsOptions: qrStore.currentQr.conersDotsOptions,
    backgroundOptions: qrStore.currentQr.backgroundOptions,
    custom: true,
  }

  tmpNameDesign.value = ""

  if(LIST_THEME.value.find(item => item.name === tmpNameDesign.value && !item.custom)) {
    return
  }

  if(LIST_THEME.value.find(item => item.name === tmpNameDesign.value)) {
    const index = LIST_THEME.value.findIndex(item => item.name === tmpNameDesign.value)
    LIST_THEME.value[index] = tmp
    setCookie(LIST_THEME.value)
    return
  }

  LIST_THEME.value.push(tmp)
  setCookie(LIST_THEME.value)
}

function deleteTheme(name: string) {
  const index = LIST_THEME.value.findIndex(item => item.name === name)
  LIST_THEME.value.splice(index, 1)
  setCookie(LIST_THEME.value)
}

function setCookie(list: DefaultThemeInterface[]) {
  const date = new Date()
  date.setTime(date.getTime() + (1000 * 60 * 60 * 24 * 30)) // 30 days
  document.cookie = "design=" + JSON.stringify(list) + "; expires=" + date.toUTCString() + "; path=/"
}

function getCookie() {
  const cookie = document.cookie
  if (cookie.includes("design=")) {
    const list = JSON.parse(cookie.split("design=")[1].split(";")[0])
    if (Array.isArray(list)) {
      return list
    }
  }
}

</script>

<template>
  <section class="border p-4 mt-6 rounded">
    <h3
      class="font-bold cursor-pointer flex items-center text-stone-500 hover:text-black gap-2"
      @click="showDesign = !showDesign"
    >
      <PencilIcon class="size-4" />
      <span>Design prédéfini</span>
    </h3>
    <div class="flex flex-col gap-2" v-if="showDesign">
      <div class="form_group" v-if="qrStore.use_cookie">
        <label>Enregistrer les options actuelles :</label>
        <div class="flex gap-2">
          <input type="text" v-model="tmpNameDesign" class="w-full p-2 border rounded flex-1" placeholder="Nom du design" />
          <button
            @click="addDesign"
            :disabled="tmpNameDesign === ''"
            class="bg-gray-400 text-white font-bold py-2 px-4 rounded"
            :class="tmpNameDesign === '' ? 'opacity-50' : 'hover:bg-gray-700'"
          >
            {{ LIST_THEME.find(item => item.name === tmpNameDesign) ? 'Modifier' : 'Ajouter' }}
          </button>
        </div>
      </div>
      <section class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1">
        <div
          @click="setDesign(defaultTheme)"
          class="border rounded bg-slate-100 p-4 flex gap-1 md:gap-2 flex-col items-center justify-center cursor-pointer hover:outline outline-1 outline-black"
        >
          Reset
        </div>
        <div
          v-for="i in LIST_THEME" :key="i.name"
          @click="setDesign(i)"
          class="relative border rounded bg-slate-100 p-4 flex gap-1 md:gap-2 flex-col items-center justify-center cursor-pointer"
          :class="tmpDesign === i.name ? 'border-2 border-black' : 'hover:outline outline-1 outline-black'"
        >
          <p class="text-sm text-stone-500 flex flex-col gap-1">
            <span>{{ i.name }}</span>
            <span v-if="i.custom" class="text-gray-400 italic text-xs">(custom)</span>
          </p>
          <img v-if="!i.custom" :src="i.imageDemo" class="w-32 h-32 object-cover" :alt="i.name" />
          <div v-if="i.custom">
            <button @click="deleteTheme(i.name)" class="text-red-500 absolute top-2 right-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>