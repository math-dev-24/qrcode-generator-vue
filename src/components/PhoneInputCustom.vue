<template>
  <div v-if="state" class="flex gap-4 items-center">
    <select v-model="localPhone.type">
      <option value="Work">Work</option>
      <option value="Home">Home</option>
      <option value="Mobile">Mobile</option>
      <option value="Fax">Fax</option>
      <option value="Other">Other</option>
    </select>
    <select v-model="localPhone.country_code">
      <option v-for="code in countryCode" :key="code.value" :value="code.value">{{ code.name }}</option>
    </select>
    <input type="text" id="telephone" v-model="localPhone.number"/>
    <div @click="updatePhone" class="text-green-600 font-bold cursor-pointer text-sm hover:underline">Valider</div>
    <div @click="cancelPhone" class="text-orange-600 font-bold cursor-pointer text-sm hover:underline">Annuler</div>
    <div @click="deletePhone" class="text-red-600 font-bold cursor-pointer text-sm hover:underline">Supprimer</div>
  </div>
  <div v-else class="flex gap-2 items-center">
    <p>{{phone.type}} : {{phone.country_code}}{{phone.number}}</p>
    <PencilSquareIcon class="size-6 text-stone-600 cursor-pointer" @click="state = true" />
  </div>
</template>

<script setup lang="ts">
import type { PhoneInterface } from '@/shared/interface/VCardInterface'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { countryCode } from '@/shared/data/countryCode'

const state = ref<boolean>(false)
const props =defineProps<{
  phone: PhoneInterface
}>()

const localPhone = ref<Partial<PhoneInterface>>({
  type: props.phone.type,
  number: props.phone.number,
  country_code: props.phone.country_code
})


const emit = defineEmits<{
  (e: 'updatePhone', phone: PhoneInterface): void;
  (e: 'deletePhone', id: string): void;
}>()

function updatePhone(){
  const tmpPhone: PhoneInterface = {
    id: props.phone.id,
    type: localPhone.value.type as "Work" | "Home" | "Mobile" | "Fax" | "Other",
    number: localPhone.value.number as string,
    country_code: localPhone.value.country_code as string
  }
  emit('updatePhone', tmpPhone)
  state.value = false
}

function cancelPhone(){
  state.value = false
  localPhone.value.type = props.phone.type
  localPhone.value.number = props.phone.number
}
function deletePhone(){
  emit('deletePhone', props.phone.id)
}

</script>