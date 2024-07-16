<template>
  <div class="bg-stone-300 py-6 px-4 rounded-xl my-6 drop-shadow container m-auto">
    <div class="grid grid-cols-2 gap-4">
      <div class="form_group">
        <label for="nom">Nom :<span class="text-red-600">*</span></label>
        <input type="text" id="nom" v-model="currentQr.name"/>
      </div>
      <div class="form_group">
        <label for="prenom">Prénom :<span class="text-red-600">*</span></label>
        <input type="text" id="prenom" v-model="currentQr.surname"/>
      </div>
      <div class="col-span-2 h-1 bg-stone-500 rounded-lg"></div>
      <div class="form_group">
        <label for="email">Email :</label>
        <input type="text" id="email" v-model="currentQr.email"/>
      </div>
      <div class="form_group">
        <label for="telephone">Téléphone :<span class="text-red-600">*</span></label>
        <PhoneInputCustom v-for="tel in currentQr.phone" :key="tel.id" :phone="tel" @updatePhone="updatePhone" @deletePhone="deletePhone"/>
        <p @click="addPhone" class="text-green-600 font-bold cursor-pointer text-sm">Ajouter</p>
      </div>
      <div class="form_group">
        <label for="website">Site internet :</label>
        <input type="text" id="website" v-model="currentQr.website"/>
      </div>
      <div class="form_group">
        <label for="company">Entreprise :</label>
        <input type="text" id="company" v-model="currentQr.company"/>
      </div>
      <div class="form_group">
        <label for="job">Fonction :</label>
        <input type="text" id="job" v-model="currentQr.job"/>
      </div>
      <div class="form_group">
        <label for="street">Adresse :</label>
        <input type="text" id="street" v-model="currentQr.address.street"/>
      </div>
      <div class="form_group">
        <label for="city">Ville :</label>
        <input type="text" id="city" v-model="currentQr.address.city"/>
      </div>
      <div class="form_group">
        <label for="state">Etat :</label>
        <input type="text" id="state" v-model="currentQr.address.state"/>
      </div>
      <div class="form_group">
        <label for="zip">Code postal :</label>
        <input type="text" id="zip" v-model="currentQr.address.zip"/>
      </div>
      <div class="form_group">
        <label for="country">Pays :</label>
        <input type="text" id="country" v-model="currentQr.address.country"/>
        </div>
    </div>
    <button
      @click="generate"
      class="bg-orange-600 text-white hover:bg-orange-500 px-2 py-1 rounded transition-all duration-150"
    >
      Générer
    </button>
  </div>
</template>

<script setup lang="ts">

import type { PhoneInterface, VCardInterface } from '@/shared/interface/VCardInterface'
import { ref } from 'vue'
import { useQrStore } from '@/stores/QrStore'
import { nanoid } from 'nanoid'
import type { QrInterface } from '@/shared/interface/QrInterface'
import { generateVcard } from '@/shared/Vcard'
import PhoneInputCustom from '@/components/PhoneInputCustom.vue'

const currentQr = ref<VCardInterface>({
  name: "Doe",
  surname: "John",
  company: "Google",
  job: "Director",
  email: "john.doe@gmail.com",
  website: "https://google.com",
  phone: [{id: nanoid(),type: "Work", number: "+0987654321"}],
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "USA"
  }
})

function generate(){
  console.log("click")
  const tmp_qr: QrInterface = {
    id: nanoid(),
    value: generateVcard(currentQr.value),
    margin: 0,
    background: "#ffffff",
    foreground: "#000000",
    type: "vcard"
  }
  useQrStore().addQr(tmp_qr)
}

function addPhone(){
  currentQr.value.phone.push({id: nanoid(), type: "Work", number: "+0987654321"})
}

function updatePhone(phone: PhoneInterface){
  currentQr.value.phone = currentQr.value.phone.map((p: PhoneInterface) => {
    if(p.id === phone.id){
      return phone
    }
    return p
  })
}

function deletePhone(id: string){
  currentQr.value.phone = currentQr.value.phone.filter((p: PhoneInterface) => {
    return p.id !== id
  })
}

</script>