<template>
  <div>
    <h3>Scanner/downloader un QR Code</h3>
    <input type="file" @change="handleFileChange" />

    <!-- Bouton pour activer/désactiver la caméra -->
    <button @click="toggleCamera">
      {{ cameraActive ? 'Arrêter la caméra' : 'Démarrer la caméra' }}
    </button>

    <div v-show="cameraActive && !scanSuccess" id="qr-reader" class="rounded-full"
         style="width: 250px; height: 250px;"></div>

    <div class="rounded border outline outline-1 outline-green-300 px-2 py-4 mt-4 bg-green-100 text-green-700">
      <p>
        <span class="font-bold">Type : </span>
        <span>{{ qrCodeType }}</span>
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
import { onMounted, onUnmounted, ref } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'

const qrCodeData = ref<string | null>(null)
const qrCodeType = ref<string>('Unknown')
const scanSuccess = ref<boolean>(false)
const cameraActive = ref<boolean>(false)

let html5QrCode: Html5Qrcode | null = null

function onScanSuccess(decodedText: string) {
  qrCodeData.value = decodedText
  qrCodeType.value = detectQRCodeType(decodedText)
  scanSuccess.value = true
  stopCamera()
}

function onScanError(errorMessage: string) {
  console.warn(`QR code scan error: ${errorMessage}`)
}

function startCamera() {
  if (html5QrCode) {
    html5QrCode.start(
      { facingMode: 'environment' },
      {
        fps: 10,
        qrbox: 250
      },
      onScanSuccess,
      onScanError
    ).catch(error => {
      console.error(`Failed to start QR code scanner: ${error}`)
    })
  }
}

function stopCamera() {
  if (html5QrCode) {
    html5QrCode.stop().catch(error => {
      console.error(`Failed to stop QR code scanner: ${error}`)
    })
    cameraActive.value = false
  }
}

function toggleCamera() {
  if (cameraActive.value) {
    stopCamera()
  } else {
    cameraActive.value = true
    if (!html5QrCode) {
      html5QrCode = new Html5Qrcode('qr-reader')
    }
    startCamera()
  }
}

onMounted(() => {
  html5QrCode = new Html5Qrcode('qr-reader')
})

onUnmounted(() => {
  if (html5QrCode) {
    html5QrCode.stop().catch((error) => {
      console.error(`Failed to stop QR code scanner: ${error}`)
    })
  }
})

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
  scanSuccess.value = false
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
        scanSuccess.value = true
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  } else {
    qrCodeData.value = 'L\'image sélectionnée n\'est pas une image QR Code'
  }
}
</script>