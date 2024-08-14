<template>
  <div class="flex flex-col gap-4">
    <div class="form_group">
      <label for="phone">Numéro de téléphone : <span class="text-red-600">*</span></label>
      <input type="text" id="phone" v-model="phone" placeholder="+33645842524" />
    </div>
    <div class="form_group">
      <label for="message">Message : <span class="text-red-600">*</span></label>
      <textarea type="text" id="message" v-model="message" placeholder="Bonjour, ..." />
    </div>
    <ButtonForm @generateQr="generateQr" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useQrStore } from '@/stores/QrStore'
import { smsSend } from '@/shared/SmsSend'
import ButtonForm from '@/components/form/ButtonForm.vue'
import { checkPhone } from '@/shared/validator'

const phone = ref<string>("")
const message = ref<string>("")

const emit = defineEmits<{
  (e: 'generateQr', text: string): void
}>()

onMounted(() => {
  checkForm()
})

watch([phone, message], () => {
  checkForm()
})

function generateQr () {
  const sms_str: string = smsSend(phone.value, message.value)
  emit('generateQr', sms_str)
}

function checkForm() {
  if(phone.value.length === 0 || message.value.length === 0) {
    useQrStore().addAlert("Données d'entrée manquantes")
  }else{
    useQrStore().removeAlert("Données d'entrée manquantes")
  }
  if(!checkPhone(phone.value)) {
    useQrStore().addAlert("Numéro de téléphone invalide")
  }else{
    useQrStore().removeAlert("Numéro de téléphone invalide")
  }
}

</script>