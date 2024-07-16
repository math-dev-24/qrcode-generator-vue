<template>
  <header class="flex py-4 px-2 justify-between">
    <h1 class="flex-1"><router-link to="/">Qr Code Generator</router-link></h1>
    <ul class="flex">
      <li v-for="mode in MODE" :key="mode.path"><router-link :to="{path: mode.path}">{{ mode.name }}</router-link></li>
    </ul>
  </header>
</template>
<script setup lang="ts">
import { MODE } from '@/shared/data'
</script>