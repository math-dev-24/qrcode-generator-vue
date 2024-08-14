<template>
  <footer>
    <a href="https://mathieu-busse.dev/" target="_blank">Website</a>
    <a href="https://github.com/math-dev-24/qrcode-generator-vue" target="_blank">Github</a>
    <a href="https://buymeacoffee.com/mathieub" target="_blank">Buy me a coffee</a>
  </footer>
</template>

<style scoped>
footer {
  @apply flex justify-end items-center gap-2 md:gap-4 py-8 px-6 md:px-12;
  a {
    @apply hover:underline mx-2 hover:text-red-400;
  }
}


</style>