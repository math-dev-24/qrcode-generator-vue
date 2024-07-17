<template>
  <select v-model="model">
    <optgroup label="Codes pays">
      <option v-for="country in countryCode" :key="country.name" :value="country.value">{{ country.name }}</option>
    </optgroup>
  </select>
</template>
<script setup lang="ts">
import { countryCode } from '@/shared/data/countryCode'

const model = defineModel<string>("code")
</script>