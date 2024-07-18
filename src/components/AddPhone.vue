<template>
  <div class="flex gap-2 items-center">
    <select v-model="tmp_type">
      <option value="Work">Work</option>
      <option value="Home">Home</option>
      <option value="Mobile">Mobile</option>
      <option value="Fax">Fax</option>
      <option value="Other">Other</option>
    </select>
    <select v-model="tmp_code">
      <option v-for="code in countryCode" :key="code.value" :value="code.value">{{ code.name }}</option>
    </select>
    <input type="text" v-model="tmp_phone"/>
    <XCircleIcon class="size-6 text-orange-500 cursor-pointer" @click="emit('closeAddPhone')" />
    <template v-if="checkPhone(tmp_phone) && checkPhoneType(tmp_type) && tmp_code">
      <CheckIcon class="size-6 text-green-500 cursor-pointer" @click="emit('addPhone', {id: nanoid(), type: tmp_type as PhoneType, number: tmp_phone, country_code: tmp_code})" />
    </template>
    <template v-else>
      <p class="text-red-700 text-sm">Le numéro de téléphone est invalide !</p>
    </template>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PhoneInterface, PhoneType } from '@/shared/interface/VCardInterface'
import { XCircleIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { nanoid } from 'nanoid'
import { checkPhone, checkPhoneType } from '@/shared/validator'
import { countryCode } from '@/shared/data/countryCode'

const tmp_type = ref<string>("Work")
const tmp_phone = ref<string>("")
const tmp_code = ref<string>("+33")

const emit = defineEmits<{
  (e: 'addPhone', phone: PhoneInterface): void
  (e: 'closeAddPhone'): void
}>()


</script>