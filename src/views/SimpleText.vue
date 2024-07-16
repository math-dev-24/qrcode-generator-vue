<template>
  <section class="container mx-auto">
    <h1 class="text-center">Générer un QR Code de texte</h1>
    <Text />
    <div class="grid grid-cols-4 gap-4">
      <QRCard v-for="qr in useQrStore().getListText" :key="qr.id" :qr="qr" />
    </div>
  </section>
</template>
<script setup lang="ts">
import QRCard from '@/components/QRCard.vue'
import Text from '@/components/form/Text.vue'
import { useQrStore } from '@/stores/QrStore'
</script>