<template>
  <div class="flex flex-col gap-4">
    <div class="form_group">
      <label for="ssid">Nom du réseau : <span class="text-red-600">*</span></label>
      <input type="text" id="ssid" v-model="current.ssid" placeholder="SSID" />
    </div>
    <div class="form_group">
      <label for="password">Mot de passe : <span class="text-red-600">*</span></label>
      <input type="text" id="password" v-model="current.password" placeholder="Mot de passe" />
    </div>
    <div class="form_group">
      <label for="security">Sécurité : <span class="text-red-600">*</span></label>
      <select id="security" v-model="current.security">
        <optgroup label="Sécurité">
          <option value="WEP">WEP</option>
          <option value="WPA">WPA</option>
          <option value="WPA2">WPA2</option>
        </optgroup>
      </select>
    </div>
    <div class="form_group items-start">
      <label for="hidden">Réseau caché : <span class="text-red-600">*</span></label>
      <input type="checkbox" id="hidden" v-model="current.hidden" />
    </div>
    <Option />
    <ButtonForm @generateQr="generateQr" />
  </div>
</template>
<script setup lang="ts">
import ButtonForm from '@/components/form/ButtonForm.vue'
import { onMounted, reactive, watch } from 'vue'
import { useQrStore } from '@/stores/QrStore'
import Option from '@/components/form/Option.vue'

function generateQr() {
  const wifi_str: string = `WIFI:T:${current.security};S:${current.ssid};P:${current.password};H:${current.hidden};;`
  emit('generateQr', wifi_str)
}

const current = reactive<{
  ssid: string;
  password: string;
  security: string;
  hidden: boolean;
}>({
  ssid: "",
  password: "",
  security: "WPA2",
  hidden: false
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
  if (current.ssid.length === 0) {
    useQrStore().addAlert('Le nom du réseau est vide')
  }else{
    useQrStore().removeAlert('Le nom du réseau est vide')
  }
  if (current.password.length === 0) {
    useQrStore().addAlert('Le mot de passe est vide')
  }else{
    useQrStore().removeAlert('Le mot de passe est vide')
  }
}

</script>