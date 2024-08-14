<template>
  <div>
    <h3>Scanner/downloader un QR Code</h3>
    <input type="file" @change="handleFileChange" />
    <div class="rounded border outline outline-1 outline-green-300 px-2 py-4 mt-4 bg-green-100 text-green-700">
      <p>
        <span class="font-bold">Type : </span>
        <span>{{ detectQRCodeType(qrCodeData) }}</span>
      </p>
      <p v-if="qrCodeData">
        <span class="font-bold">Données sur le QR Code : </span>
        <span>{{ qrCodeData }}</span>
      </p>
      <p v-else-if="qrCodeData === ''">Pas de QR Code détecté</p>
      <p v-else>{{ qrCodeData }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import jsQR from 'jsqr'
import { ref } from 'vue'


const qrCodeData = ref<string | null>(null)


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
        detectQRCodeType(qrCodeData.value)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  } else {
    qrCodeData.value = 'L\'image sélectionnée n\'est pas une image QR Code'
  }
}
</script>