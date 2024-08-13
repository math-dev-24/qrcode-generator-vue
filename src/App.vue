<template>
  <div class="flex flex-col min-h-screen m-0 p-0">
    <Header />
    <section class="flex-1 p-4 bg-stone-100">
      <router-view></router-view>
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
import { useQrStore } from '@/stores/QrStore'

const showCookie = ref<boolean>(true)

function getCookie() {
  const cookie = document.cookie
  if (cookie.includes("cookie=")) {
    return true
  }
}

onBeforeMount(() => {
  const cookie = getCookie()
  if (cookie) {
    const qrStore = useQrStore()
    qrStore.use_cookie = true
    showCookie.value = false
  }
})


</script>

