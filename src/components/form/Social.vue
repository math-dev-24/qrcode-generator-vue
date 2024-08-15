<template>
  <section>
    <div class="flex gap-2 items-center justify-around">
      <div
        v-for="social in socials"
        :key="social"
        class="px-4 border py-2 rounded cursor-pointer flex-1 text-center"
        :class="mode === social ? 'text-white bg-stone-500 drop-shadow' : 'hover:bg-stone-200 hover:outline hover:outline-2 outline-stone-400'"
        @click="mode=social"
      >
        {{social}}
      </div>
    </div>
    <div class="form_group">
      <label for="value">
        <span v-if="mode == 'twitter' || mode == 'youtube'">Nom du compte :</span>
        <span v-if="mode == 'telegram' || mode == 'whatsapp'">Nom du groupe :</span>
        <span v-if="mode == 'tweet'">Tweet :</span>
        <span class="text-red-600"> *</span>
      </label>
      <input type="text" id="value" v-model="value"/>
    </div>
    <ButtonForm @generateQr="generate" />
  </section>
</template>

<script lang="ts" setup>
import { useQrStore } from '@/stores/QrStore'
import ButtonForm from '@/components/form/ButtonForm.vue'
import { onMounted, ref, watch } from 'vue'

const qrStore = useQrStore()
const mode = ref<string>("twitter")
const value = ref<string>("")

const socials = ref<string[]>(['twitter', 'youtube', 'tweet', 'telegram', 'whatsapp'])

function generate() {
  let tmp_content: string = ""
  if (mode.value === "twitter") {
    tmp_content = `https://twitter.com/${encodeURIComponent(value.value)}`
  } else if (mode.value === "youtube") {
    tmp_content = `https://www.youtube.com/channel/${encodeURIComponent(value.value.replace('@', ''))}`
  } else if (mode.value === "tweet") {
    tmp_content = `https://twitter.com/intent/tweet?text=${encodeURIComponent(value.value)}`
  } else if (mode.value === "telegram") {
    tmp_content = `https://t.me/${encodeURIComponent(value.value)}`
  } else if (mode.value === "whatsapp") {
    tmp_content = `https://wa.me/${encodeURIComponent(value.value)}`
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
  if((mode.value === 'twitter' || mode.value === 'youtube' || mode.value === 'telegram' || mode.value === 'whatsapp') && value.value === "") {
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
