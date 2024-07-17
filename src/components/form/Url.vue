<template>
  <div class="form_group">
    <label class="block my-1 font-bold" for="url">Entrez l'URL : <span class="text-red-600">*</span></label>
    <input id="url" v-model="url" type="text" placeholder="https://google.com"/>
  </div>
  <Option />
  <ButtonForm @generateQr="emit('generateQr', url)" />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { checkUrl } from '@/shared/validator'
import { useQrStore } from '@/stores/QrStore'
import ButtonForm from '@/components/form/ButtonForm.vue'
import Option from '@/components/form/Option.vue'


const url = ref<string>('')

onMounted(() => {
  checkForm()
})

watch(url, () => {
  checkForm()
})

const emit = defineEmits<{
  (e: 'generateQr', text: string): void
}>()

function checkForm() {
  if (!checkUrl(url.value)) {
    useQrStore().addAlert('L\'URL est invalide et/ou vide !')
  }else{
    useQrStore().removeAlert('L\'URL est invalide et/ou vide !')
  }
}

</script>