<template>
  <h1>Générer un QR Code de contact</h1>
  <div>
    <label for="nom">Nom</label>
    <input type="text" id="nom" v-model="nom"/>
  </div>
  <div>
    <label for="prenom">Prénom</label>
    <input type="text" id="prenom" v-model="prenom"/>
  </div>
  <div>
    <label for="adresse">Adresse</label>
    <input type="text" id="adresse" v-model="adresse"/>
  </div>
  <div>
    <label for="telephone">Téléphone</label>
    <input type="text" id="telephone" v-model="telephone"/>
  </div>
  <div>
    <label for="email">Email</label>
    <input type="text" id="email" v-model="email"/>
  </div>
  <div v-if="nom && prenom && adresse && telephone && email">
    <QRCodeVue :value="`MECARD:N:${nom};S:${prenom};A:${adresse};TEL:${telephone};EMAIL:${email}`" :size="200" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QRCodeVue from 'vue-qrcode'
const nom = ref<string>("")
const prenom = ref<string>("")
const adresse = ref<string>("")
const telephone = ref<string>("")
const email = ref<string>("")
</script>