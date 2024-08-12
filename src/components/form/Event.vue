<template>
  <section class="grid grid-cols-2 gap-4">
    <div class="form_group col-span-2">
      <label>Type : <span class="text-red-600">*</span></label>
      <div class="flex items-center gap-2 justify-around">
        <div
          @click="current.type = 'Apple'"
          :class="current.type === 'Apple' ? 'text-white bg-blue-500 drop-shadow' : 'hover:bg-stone-200 hover:outline hover:outline-2 outline-stone-400'"
          class="font-bold flex items-center gap-2 cursor-pointer border px-6 py-2 rounded"
        >
          <CalendarIcon class="h-4 w-4" />
          <span>Apple</span>
        </div>
        <div
          @click="current.type = 'Google'"
          :class="current.type === 'Google' ? 'text-white bg-blue-500 drop-shadow' : 'hover:bg-stone-200 hover:outline hover:outline-2 outline-stone-400'"
          class="font-bold flex items-center gap-2 cursor-pointer border px-6 py-2 rounded"
        >
          <CalendarIcon class="h-4 w-4" />
          <span>Google</span>
        </div>
      </div>
    </div>
    <div class="form_group col-span-2">
      <label for="title">Titre : <span class="text-red-600">*</span></label>
      <input type="text" id="title" v-model="current.title" placeholder="Le concert de Paris" />
    </div>
    <div class="form_group">
      <label for="startDate">Date de début : <span class="text-red-600">*</span></label>
      <input type="datetime-local" id="startDate" v-model="current.startDate" placeholder="2023-01-01" />
    </div>
    <div class="form_group">
      <label for="endDate">Date de fin : <span class="text-red-600">*</span></label>
      <input type="datetime-local" id="endDate" v-model="current.endDate" placeholder="2023-01-01" />
    </div>
    <div class="col-span-2 font-bold text-center" v-if="current.startDate && current.endDate">
      Durée : {{deltaHours()}}
    </div>
    <div class="form_group col-span-2">
      <label for="description">Description :</label>
      <textarea id="description" v-model="current.description" placeholder="Ici est la description de l'évènement" />
    </div>
    <div class="form_group col-span-2">
      <label for="location">Lieu :</label>
      <textarea id="location" v-model="current.location" placeholder="Le concert de Paris" />
    </div>
  </section>
  <Option />
  <ButtonForm @generateQr="emit('generateQr', generateEventQRCode(current))" />
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import ButtonForm from '@/components/form/ButtonForm.vue'
import Option from '@/components/form/Option.vue'
import { useQrStore } from '@/stores/QrStore'
import { CalendarIcon } from '@heroicons/vue/24/outline'
import moment from 'moment'
import type { EventDetails } from '@/shared/Event'
import { generateEventQRCode } from '@/shared/Event'
import { COLOR_PALETTE } from '@/shared/data/colorPalette'

const current = reactive<EventDetails>({
  title: "",
  type: "Apple",
  startDate: "",
  endDate: "",
  description: "",
  location: ""
})

const emit = defineEmits<{
  (e: 'generateQr', text: string): void
}>()

onMounted(() => {
  checkForm()
})

watch(current, () => {
  checkForm()
})

function checkForm() {
  if(current.title === "") {
    useQrStore().addAlert("Le titre est vide")
  }else{
    useQrStore().removeAlert("Le titre est vide")
  }
  if(current.startDate === "") {
    useQrStore().addAlert("La date de début est vide")
  }else{
    useQrStore().removeAlert("La date de début est vide")
  }
  if(current.endDate === "") {
    useQrStore().addAlert("La date de fin est vide")
  }else{
    useQrStore().removeAlert("La date de fin est vide")
  }
  const date_start_tmp = moment(current.startDate)
  const date_end_tmp = moment(current.endDate)
  if(!date_start_tmp.isValid()) {
    useQrStore().addAlert("La date de début n'est pas valide")
  }else{
    useQrStore().removeAlert("La date de début n'est pas valide")
  }
  if(!date_end_tmp.isValid()) {
    useQrStore().addAlert("La date de fin n'est pas valide")
  }else{
    useQrStore().removeAlert("La date de fin n'est pas valide")
  }
}

function deltaHours(){
  let response: string = ""
  const date_1 = moment(current.startDate)
  const date_2 = moment(current.endDate)
  const delta_j = date_2.diff(date_1, 'days')
  let delta_h = date_2.diff(date_1, 'hours')
  delta_h -= delta_j * 24
  let delta_m = date_2.diff(date_1, 'minutes')
  delta_m -= delta_j * 24 * 60
  delta_m -= delta_h * 60

  if(delta_j > 0){
    response += `${delta_j} jours`
  }
  if(delta_h > 0){

    response += ` ${delta_h} heures`
  }
  if(delta_m > 0){
    response += ` ${delta_m} minutes`
  }
  return response
}


</script>