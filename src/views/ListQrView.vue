<template>
  <h1 class="text-center text-2xl uppercase font-bold">Liste des QR</h1>
  <section class="container mx-auto">
    <div class="grid grid-cols-3 gap-4" v-if="useQrStore().list.length > 0">
      <QRCard  v-for="qr in useQrStore().list" :key="qr.id" :qr="qr" />
    </div>
    <div v-else class="text-center text-2xl font-bold border p-16 my-6 bg-stone-200 rounded flex flex-col items-center justify-center">
      <span>Aucun QR</span>
      <router-link to="/" class="text-stone-500 hover:text-black hover:underline">
        <span class="text-sm">Créer un QR</span>
      </router-link>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useQrStore } from '@/stores/QrStore'
import QRCard from '@/components/QRCard.vue'
</script>