<template>
  <div class="flex flex-col min-h-screen m-0 p-0">
    <Header />
    <section class="flex-1 p-4 bg-stone-100">
      <router-view :key="$route.fullPath" />
    </section>
    <CookiePopUp :showCookie="showCookie" @close="showCookie = false" />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Template/Header.vue'
import Footer from './components/Template/Footer.vue'
import CookiePopUp from '@/components/cookie/cookiePopUp.vue'
import { onBeforeMount, ref } from 'vue'
import { getCookieMode, useQrStore } from '@/stores/QrStore'

const qrStore = useQrStore()
const showCookie = ref<boolean>(true)

function getCookie() {
  const cookie = document.cookie
  if (cookie.includes("QrCodeMathCookie=")) {
    return true
  }
}

onBeforeMount(() => {
  const cookie = getCookie()
  if (cookie) {
    qrStore.currentQr.type = getCookieMode()
    qrStore.use_cookie = true
    showCookie.value = false
  }
})


</script>

