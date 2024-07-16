<template>
  <h1>Page principale</h1>
  <div class="my-2">
    <span
      v-for="mode in MODE"
      class="p-2 rounded border m-2 hover:bg-slate-600 cursor-pointer"
      :key="mode.path"
    >
      <router-link :to="mode.path">{{ mode.name }}</router-link>
    </span>
  </div>
</template>

<script setup lang="ts">
import { MODE } from '@/shared/data'
</script>