<template>
  <header class="flex py-1 md:py-2 px-2 sm:px-8 md:px-10 lg:px-14 bg-white justify-between drop-shadow-xl border-b border-b-gray-200">
    <h1 class="flex-1 text-lg font-bold md:text-2xl"><router-link to="/">QR CODE GENERATOR</router-link></h1>
    <ul class="flex text-lg md:text-xl">
      <li><router-link to="/">Générer</router-link></li>
      <li><router-link to="/list">Mes QrCode</router-link></li>
    </ul>
  </header>
</template>
