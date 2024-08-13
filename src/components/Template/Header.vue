<template>
  <header class="flex py-1 md:py-2 px-2 sm:px-8 md:px-14 lg:px-16 justify-between">
    <h1 class="flex-1 text-lg md:text-xl"><router-link to="/">QR CODE GENERATOR</router-link></h1>
    <ul class="flex text-lg md:text-xl" v-show="qrStore.use_cookie">
      <li><router-link to="/">Générer</router-link></li>
      <li><router-link to="/list">Mes QrCode</router-link></li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { useQrStore } from '@/stores/QrStore'

const qrStore = useQrStore()

</script>