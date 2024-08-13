<script setup lang="ts">
defineProps<{
  showCookie: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const acceptCookies = () => {
  const date = new Date()
  date.setTime(date.getTime() + (1000 * 60 * 60 * 24 * 30)) // 30 days
  document.cookie = "cookie=true; expires=" + date.toUTCString() + "; path=/"
  emit('close')
}

</script>

<template>
  <Teleport to="body" v-if="showCookie">
    <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"></div>
    <div class="fixed z-50 bottom-4 w-[90vw] left-[5vw] bg-white rounded-lg drop-shadow-xl p-4 flex flex-col gap-2 py-8 px-4">
      <p class="text-center font-semibold">Ce site utilise des cookies pour sauvegarder vos préférences et vous permettre de personnaliser votre expérience (Durée du cookie : 30 jours).</p>
      <p class="text-gray-500 flex items-center gap-2 ml-2 md:ml-4 lg:ml-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M8 18q-2.5 0-4.25-1.75T2 12t1.75-4.25T8 6q2.25 0 3.913 1.425T13.925 11H22v2h-8.075q-.35 2.15-2.013 3.575T8 18"/></svg>
        <span>Sauvegarder vos design de qrcode</span>
      </p>
      <p class="text-gray-500 mb-4 flex items-center gap-2 ml-2 md:ml-4 lg:ml-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M8 18q-2.5 0-4.25-1.75T2 12t1.75-4.25T8 6q2.25 0 3.913 1.425T13.925 11H22v2h-8.075q-.35 2.15-2.013 3.575T8 18"/></svg>
        <span>Sauvegarder des qrcode générés</span>
      </p>
      <div class="flex gap-2 items-center justify-between mx-4 md:mx-8 lg:mx-12">
        <button @click="acceptCookies" class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-2/3 md:w-1/3">Accepter</button>
        <button @click="emit('close')" class="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-2/3 md:w-1/3">Refuser</button>
      </div>
    </div>
  </Teleport>
</template>