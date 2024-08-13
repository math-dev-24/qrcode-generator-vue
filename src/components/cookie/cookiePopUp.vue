<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useQrStore } from '@/stores/QrStore'

const showCookie = ref<boolean>(true)

const acceptCookies = () => {
  const date = new Date()
  date.setTime(date.getTime() + (1000 * 60 * 60 * 24 * 30)) // 30 days
  document.cookie = "cookie=true; expires=" + date.toUTCString() + "; path=/"
  showCookie.value = false
}
function getCookie() {
  const cookie = document.cookie
  if (cookie.includes("cookie=")) {
    return true
  }
}

onMounted(() => {
  const cookie = getCookie()
  if (cookie) {
    const qrStore = useQrStore()
    qrStore.use_cookie = true
    showCookie.value = false
  }
})

</script>

<template>
  <Teleport to="body" v-if="showCookie">
    <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"></div>
    <div class="fixed z-50 bottom-4 w-[90vw] left-[5vw] bg-white rounded-lg drop-shadow-xl p-4 flex flex-col gap-2 py-8 px-4">
      <p class="text-center font-semibold mb-4">Ce site utilise des cookies pour sauvegarder vos préférences et vous permettre de personnaliser votre expérience.</p>
      <div class="flex gap-2 items-center justify-between mx-4 md:mx-8 lg:mx-12">
        <button @click="acceptCookies" class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-2/3 md:w-1/3">Accepter</button>
        <button @click="showCookie = false" class="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-2/3 md:w-1/3">Refuser</button>
      </div>
    </div>
  </Teleport>
</template>