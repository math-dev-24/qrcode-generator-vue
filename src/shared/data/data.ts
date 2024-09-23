import type { QrType } from '@/shared/interface/QrInterface'

interface ModeInterface {
  name: QrType,
  description: string,
  label: string,
  emoji: string,
}

export const MODE: ModeInterface[] = [
  {
    name: "url",
    label: "URL",
    description: "Créer un QR Code pour une URL",
    emoji: "🌐"
  },
  {
    name: "text",
    label: "Texte",
    description: "Créer un QR Code pour un texte",
    emoji: "📝"
  },
  {
    name: "vcard",
    label: "vCard",
    description: "Créer un QR Code pour un vCard (Contact)",
    emoji: "📎"
  },
  {
    name: "email",
    label: "Email",
    description: "Créer un QR Code pour envoyer un email",
    emoji: "📧"
  },
  {
    name: "call",
    label: "Appel",
    description: "Créer un QR Code pour faire un appel",
    emoji: "📱"
  },
  {
    name: "sms",
    label: "SMS",
    description: "Créer un QR Code pour envoyer un SMS",
    emoji: "📱"
  },
  {
    name: "wifi",
    label: "Wifi",
    description: "Créer un QR Code pour se connecter à un Wifi",
    emoji: "📶"
  },
  {
    name: "paypal",
    label: "Paypal",
    description: "Créer un QR Code pour faire un paiement Paypal",
    emoji: "💳"
  },
  {
    name: "event",
    label: "Evénement",
    description: "Créer un QR Code pour un événement",
    emoji: "📅"
  },
  {
    name: "social",
    label: "Social",
    description: "Créer un QR Code pour un réseau social",
    emoji: "🐦",
  },
  {
    name: "crypto",
    label: "Crypto",
    description: "Créer un QR Code pour une crypto monnaie",
    emoji: "🔐",
  },
  {
    name: "scanQr",
    label: "ScanQr",
    description: "Scanner un QR Code",
    emoji: "🔎",
  }
]