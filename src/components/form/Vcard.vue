<template>
  <div class="py-6 px-4">
    <div class="grid grid-cols-2 gap-4">
      <div class="form_group">
        <label for="nom">Nom : <span class="text-red-600">*</span></label>
        <input type="text" id="nom" v-model="currentQr.name"/>
      </div>
      <div class="form_group">
        <label for="prenom">Prénom : <span class="text-red-600">*</span></label>
        <input type="text" id="prenom" v-model="currentQr.surname"/>
      </div>
      <div class="col-span-2 h-0.5 bg-stone-500 rounded-lg"></div>
      <div class="form_group">
        <label for="email">Email :</label>
        <input type="text" id="email" v-model="currentQr.email"/>
      </div>
      <div class="form_group">
        <label for="website">Site internet :</label>
        <input type="text" id="website" v-model="currentQr.website"/>
      </div>
      <div class="col-span-2 h-0.5 bg-stone-500 rounded-lg"></div>
      <div class="form_group">
        <label for="company">Entreprise :</label>
        <input type="text" id="company" v-model="currentQr.company"/>
      </div>
      <div class="form_group">
        <label for="job">Fonction :</label>
        <input type="text" id="job" v-model="currentQr.job"/>
      </div>
      <div class="col-span-2 h-0.5 bg-stone-500 rounded-lg"></div>
      <div class="form_group col-span-2">
        <label for="telephone">Téléphone : <span class="text-red-600">*</span></label>
        <PhoneInputCustom v-for="tel in currentQr.phone" :key="tel.id" :phone="tel" @updatePhone="updatePhone" @deletePhone="deletePhone"/>
        <button
          @click="showAddPhone = true"
          v-if="!showAddPhone"
          class="text-green-600 font-bold text-sm hover:underline py-1 px-2 rounded text-start"
        >
          Ajouter
        </button>
        <AddPhone v-if="showAddPhone" @closeAddPhone="showAddPhone = false" @addPhone="addPhone"/>
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
        <label for="zip">Code postal :</label>
        <input type="text" id="zip" v-model="currentQr.address.zip"/>
      </div>
      <div class="form_group">
        <label for="country">Pays :</label>
        <input type="text" id="country" v-model="currentQr.address.country"/>
      </div>
    </div>
    <Option />
    <ButtonForm @generateQr="generate" />
  </div>
</template>

<script setup lang="ts">
import type { PhoneInterface, VCardInterface } from '@/shared/interface/VCardInterface'
import { ref } from 'vue'
import { generateVcard } from '@/shared/Vcard'
import PhoneInputCustom from '@/components/PhoneInputCustom.vue'
import ButtonForm from '@/components/form/ButtonForm.vue'
import AddPhone from '@/components/AddPhone.vue'
import Option from '@/components/form/Option.vue'

const showAddPhone = ref<boolean>(false)
const currentQr = ref<VCardInterface>({
  name: "Doe",
  surname: "John",
  company: "",
  job: "",
  email: "john.doe@gmail.com",
  website: "https://google.com",
  phone: [],
  address: {
    street: "",
    city: "",
    zip: "",
    country: ""
  }
})

const emit = defineEmits<{
  (e: 'generateQr', text: string): void
}>()


function generate(){
  const tmp_content: string = generateVcard(currentQr.value)
  emit('generateQr', tmp_content)
}

function addPhone(phone: PhoneInterface){
  currentQr.value.phone.push(phone)
  showAddPhone.value = false
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