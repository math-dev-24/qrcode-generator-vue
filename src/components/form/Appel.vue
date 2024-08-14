<template>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4">
    <div class="form_group">
      <label for="">Country Code : <span class="text-red-600">*</span></label>
      <span class="info">_</span>
      <SelectCountryPhone v-model:code="current.countryCode" />
    </div>
    <div class="form_group">
      <label for="phone">Numéro de téléphone : <span class="text-red-600">*</span></label>
      <span class="info">Sans le code pays</span>
      <input type="text" id="phone" v-model="current.phone" placeholder="645842524" />
    </div>
  </section>
  <ButtonForm @generateQr="emit('generateQr', `tel:${current.countryCode}${current.phone}`)" />
</template>

<script setup lang="ts">
import ButtonForm from '@/components/form/ButtonForm.vue'
import SelectCountryPhone from '@/components/input/SelectCountryPhone.vue'
import { onMounted, reactive, watch } from 'vue'
import { useQrStore } from '@/stores/QrStore'
import { checkPhone } from '@/shared/validator'

const current = reactive<{
  countryCode: string;
  phone: string;
}>({
  countryCode: "+33",
  phone: ""
})

const emit = defineEmits<{
  (e: 'generateQr', text: string): void
}>()

onMounted(() => {
  checkForm()
})

watch(current, () => {
  checkForm()
})

function checkForm() {
  if(current.phone === "") {
    useQrStore().addAlert("Le numéro de téléphone est vide")
  }else{
    useQrStore().removeAlert("Le numéro de téléphone est vide")
  }
  if(!checkPhone(current.phone)) {
    useQrStore().addAlert("Le numéro de téléphone est invalide")
  }else{
    useQrStore().removeAlert("Le numéro de téléphone est invalide")
  }
}

</script>