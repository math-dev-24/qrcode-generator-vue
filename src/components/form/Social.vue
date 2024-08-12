<template>
  <section>
    <div class="flex gap-2 items-center justify-around">
      <div
        class="px-4 border py-2 rounded cursor-pointer"
        :class="mode === 'twitter' ? 'text-white bg-blue-500 drop-shadow' : 'hover:bg-stone-200 hover:outline hover:outline-2 outline-stone-400'"
        @click="mode='twitter'"
      >
        Twitter
      </div>
      <div
        class="px-4 border py-2 rounded cursor-pointer"
        :class="mode === 'youtube' ? 'text-white bg-blue-500 drop-shadow' : 'hover:bg-stone-200 hover:outline hover:outline-2 outline-stone-400'"
        @click="mode='youtube'"
      >
        Youtube
      </div>
      <div
        class="px-4 border py-2 rounded cursor-pointer"
        :class="mode === 'tweet' ? 'text-white bg-blue-500 drop-shadow' : 'hover:bg-stone-200 hover:outline hover:outline-2 outline-stone-400'"
        @click="mode='tweet'"
      >
        Tweet
      </div>
    </div>
    <div class="form_group">
      <label for="value">
        {{mode === 'twitter' || mode == 'youtube' ? 'Nom du compte :' : 'Tweet :'}}
        <span class="text-red-600">*</span>
      </label>
      <input type="text" id="value" v-model="value"/>
    </div>
    <Option />
    <ButtonForm @generateQr="generate" />
  </section>
</template>

<script lang="ts" setup>
import { useQrStore } from '@/stores/QrStore'
import ButtonForm from '@/components/form/ButtonForm.vue'
import Option from '@/components/form/Option.vue'
import { onMounted, ref, watch } from 'vue'
import { COLOR_PALETTE } from '@/shared/data/colorPalette'

const qrStore = useQrStore()
const mode = ref<string>("twitter")
const value = ref<string>("")

function generate() {
  let tmp_content: string = ""
  if(mode.value === "twitter") {
    tmp_content = `https://twitter.com/${encodeURIComponent(value.value)}`
  }else if(mode.value === "youtube") {
    tmp_content = `https://www.youtube.com/channel/${encodeURIComponent(value.value.replace('@', ''))}`
  }else if(mode.value === "tweet") {
    tmp_content = `https://twitter.com/intent/tweet?text=${encodeURIComponent(value.value)}`
  }
  qrStore.addQr(tmp_content)
}

onMounted(() => {
  checkForm()
})

watch([value, mode], () => {
  checkForm()
})

function checkForm() {
  if((mode.value === 'twitter' || mode.value === 'youtube') && value.value === "") {
    qrStore.addAlert("Le nom de compte est vide")
  }else{
    qrStore.removeAlert("Le nom de compte est vide")
  }
  if(mode.value === "tweet" && value.value === "") {
    qrStore.addAlert("Le tweet est vide")
  }else{
    qrStore.removeAlert("Le tweet est vide")
  }
}


</script>
