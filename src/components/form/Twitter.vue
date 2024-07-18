<template>
  <section>
    <div class="flex gap-2 items-center justify-around">
      <div
        class="px-4 border py-2 rounded cursor-pointer"
        :class="mode ? 'text-white bg-blue-500 drop-shadow' : 'hover:bg-stone-200 hover:outline hover:outline-2 outline-stone-400'"
        @click="mode=true"
      >
        Compte Twitter
      </div>
      <div
        class="px-4 border py-2 rounded cursor-pointer"
        :class="!mode ? 'text-white bg-blue-500 drop-shadow' : 'hover:bg-stone-200 hover:outline hover:outline-2 outline-stone-400'"
        @click="mode=false"
      >
        Tweet
      </div>
    </div>
    <div class="form_group">
      <label for="value">{{mode ? 'Nom du compte :' : 'Tweet :'}} <span class="text-red-600">*</span></label>
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

const qrStore = useQrStore()
const mode = ref<boolean>(true)
const value = ref<string>("")

function generate() {
  const tmp_content: string = mode.value ? `https://twitter.com/${value.value}` : `https://twitter.com/intent/tweet?text=${value.value}`
  qrStore.addQr(tmp_content)
}

onMounted(() => {
  checkForm()
})

watch([value, mode], () => {
  checkForm()
})

function checkForm() {
  if(mode.value && value.value === "") {
    qrStore.addAlert("Le nom de compte est vide")
  }else{
    qrStore.removeAlert("Le nom de compte est vide")
  }
  if(!mode.value && value.value === "") {
    qrStore.addAlert("Le tweet est vide")
  }else{
    qrStore.removeAlert("Le tweet est vide")
  }
}

</script>
