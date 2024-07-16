<template>
  <div class="flex flex-col min-h-screen m-0 p-0">
    <Header />
    <section class="flex-1 p-4">
      <router-view />
    </section>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Template/Header.vue'
import Footer from './components/Template/Footer.vue'
</script>

