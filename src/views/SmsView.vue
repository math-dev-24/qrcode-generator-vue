<template>
  <section class="container mx-auto">
    <h1 class="text-center">Générer un QR Code pour envoyer un SMS</h1>
    <Sms />
    <div class="grid grid-cols-4 gap-4">
      <QRCard v-for="qr in useQrStore().getListSms" :key="qr.id" :qr="qr" />
    </div>
  </section>
</template>
<script setup lang="ts">
import QRCard from '@/components/QRCard.vue'
import Sms from '@/components/form/Sms.vue'
import { useQrStore } from '@/stores/QrStore'
</script>