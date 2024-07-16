<template>
  <section class="container mx-auto">
    <h1 class="text-center">Générer un QR Code d'une URL</h1>
    <Url />
    <div class="grid grid-cols-4 gap-4">
      <QRCard v-for="qr in useQrStore().getListUrl" :key="qr.id" :qr="qr" />
    </div>
  </section>
</template>

<script setup lang="ts">
import Url from '@/components/form/Url.vue'
import QRCard from '@/components/QRCard.vue'
import { useQrStore } from '@/stores/QrStore'

</script>