<template>
  <h1>Générer un QR Code d'une URL</h1>
  <div>
    <label for="url">URL</label>
    <input type="text" id="url" v-model="url"/>
  </div>
  <div v-if="url">
    <QRCodeVue :value="url" :size="200" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QRCodeVue from 'vue-qrcode'
const url = ref<string>("")
</script>