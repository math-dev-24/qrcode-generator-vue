<template>
  <div>
    <h3>Scanner/downloader un QR Code</h3>
    <input type="file" @change="handleFileChange" />
    <div class="rounded border outline outline-1 outline-green-300 px-2 py-4 mt-4 bg-green-100 text-green-700">
      <p>
        <span class="font-bold">Type : </span>
        <span>{{ type }}</span>
      </p>
      <p v-if="qrCodeData">
        <span class="font-bold">Données sur le QR Code : </span>
        <span>{{ qrCodeData }}</span>
      </p>
      <p v-else-if="qrCodeData === ''">Pas de QR Code détecté</p>
      <p v-else v-html="qrCodeData"></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import jsQR from 'jsqr'


const qrCodeData = ref<string | null>(null)
const type = ref<string>("twitter")


function detectQRCodeType(data: string | null): string {
  if (!data) return 'Unknown'

  if (/^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(data)) {
    if (data.includes('youtube.com')) return 'Social: YouTube'
    if (data.includes('twitter.com')) return 'Social: Twitter'
    return 'URL'
  }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data)) {
    return 'Email'
  }
  if (data.startsWith('BEGIN:VCARD') && data.endsWith('END:VCARD')) {
    return 'vCard'
  }
  if (/^\+?\d{10,15}$/.test(data)) {
    return 'Phone Number'
  }
  if (data.startsWith('WIFI:')) {
    return 'WiFi'
  }
  if (data.startsWith('BEGIN:VEVENT') && data.includes('DTSTART')) {
    return 'Google Calendar Event'
  }
  if (data.startsWith('BEGIN:VEVENT') && data.includes('DTSTART')) {
    return 'Apple Calendar Event'
  }
  if (/^paypal.me\/[a-zA-Z0-9._-]+$/.test(data)) {
    return 'PayPal'
  }
  if (data.startsWith('tel:')) {
    return 'Call'
  }
  return 'Unknown'
}

function formatVCard(vcardStr: string) {
  vcardStr = vcardStr.replace('BEGIN:VCARD', '').replace('END:VCARD', '').trim();
  vcardStr = vcardStr.replace('VERSION:3.0', '');

  const fields = {
    Nom: vcardStr.match(/N:([^;]+);/),
    Prénom: vcardStr.match(/FN:[^;]+;([^;]+)/),
    Titre: vcardStr.match(/TITLE:([^\n]+)/),
    Téléphone: vcardStr.match(/TEL;TYPE=Work:([^\n]+)/),
    Email: vcardStr.match(/EMAIL;TYPE=PREF,INTERNET:([^\n]+)/),
    Adresse: vcardStr.match(/ADR;TYPE=WORK:([^\n]+)/),
    URL: vcardStr.match(/URL:([^\n]+)/),
    Organisation: vcardStr.match(/ORG:([^\n]+)/)
  };

  let output = "";
  if (fields.Nom) output += `Nom: ${fields.Nom[1]}\n`;
  if (fields.Prénom) output += `Prénom: ${fields.Prénom[1]}\n`;
  if (fields.Titre) output += `Titre: ${fields.Titre[1]}\n`;
  if (fields.Téléphone) output += `Téléphone (Work): ${fields.Téléphone[1]}\n`;
  if (fields.Email) output += `Email: ${fields.Email[1]}\n`;
  if (fields.Adresse) output += `Adresse (Work): ${fields.Adresse[1]}\n`;
  if (fields.URL) output += `URL: ${fields.URL[1]}\n`;
  if (fields.Organisation) output += `Organisation: ${fields.Organisation[1]}\n`;

  return output.trim();}

function handleFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) {
    qrCodeData.value = 'Fichier non détecté'
    return
  }
  const file = input.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          qrCodeData.value = 'Error: QR Code illisible'
          return
        }
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, canvas.width, canvas.height)
        qrCodeData.value = code ? code.data : ''
        type.value = detectQRCodeType(qrCodeData.value)
        if(qrCodeData.value){
          if (type.value === 'vCard') {
            qrCodeData.value = formatVCard(qrCodeData.value)
          }
        }
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  } else {
    qrCodeData.value = 'L\'image sélectionnée n\'est pas une image QR Code'
  }
}
</script>