<template>
  <div class="flex gap-2 items-center">
    <select v-model="tmp_type">
      <option value="Work">Work</option>
      <option value="Home">Home</option>
      <option value="Mobile">Mobile</option>
      <option value="Fax">Fax</option>
      <option value="Other">Other</option>
    </select>
    <input type="text" v-model="tmp_phone"/>
    <XCircleIcon class="size-6 text-orange-500 cursor-pointer" @click="emit('closeAddPhone')" />
    <template v-if="checkPhone(tmp_phone) && checkPhoneType(tmp_type)">
      <CheckIcon class="size-6 text-green-500 cursor-pointer" @click="emit('addPhone', {id: nanoid(), type: tmp_type as PhoneType, number: tmp_phone})" />
    </template>
    <template v-else>
      <p class="text-red-700 text-sm">Le numéro de téléphone est invalide (+33, +XX) ou le type de téléphone n'est pas valide</p>
    </template>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PhoneInterface, PhoneType } from '@/shared/interface/VCardInterface'
import { XCircleIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { nanoid } from 'nanoid'
import { checkPhone, checkPhoneType } from '@/shared/validator'

const tmp_type = ref<string>("Work")
const tmp_phone = ref<string>("")

const emit = defineEmits<{
  (e: 'addPhone', phone: PhoneInterface): void
  (e: 'closeAddPhone'): void
}>()



</script>