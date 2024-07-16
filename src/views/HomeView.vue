<template>
  <h1>Page principale</h1>
  <div class="p-16">
    <router-link
      v-for="mode in MODE"
      class="p-2 rounded border m-2 hover:bg-stone-200 bg-stone-50 cursor-pointer p-8"
      :key="mode.path"
      :to="mode.path"
    >
      {{ mode.name }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { MODE } from '@/shared/data'
</script>