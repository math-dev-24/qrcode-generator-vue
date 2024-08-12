<template>
  <h1 class="text-center text-2xl uppercase font-bold">Liste des QR</h1>
  <section class="container mx-auto">
    <div class="grid md:grid-cols-3 gap-4" v-if="useQrStore().list.length > 0">
      <QRCard  v-for="qr in useQrStore().list" :key="qr.id" :qr="qr" />
    </div>
    <div v-else class="text-center font-bold border p-16 my-6 bg-stone-200 rounded flex flex-col items-center justify-center hover:drop-shadow transition-all duration-300">
      <span class="text-2xl">Aucun QR Code créé</span>
      <router-link to="/" class="text-stone-500 hover:text-black text-xl mt-4 flex items-center justify-center gap-1">
        <PlusCircleIcon class="size-6" />
        <span>Créer un QR Code</span>
      </router-link>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useQrStore } from '@/stores/QrStore'
import QRCard from '@/components/QRCard.vue'
import { PlusCircleIcon } from '@heroicons/vue/24/solid'
</script>