import type { QrType } from '@/shared/interface/QrInterface'

interface ModeInterface {
  name: QrType,
  label: string,
  emoji: string,
}

export const MODE: ModeInterface[] = [
  {
    name: "url",
    label: "URL",
    emoji: "🌐"
  },
  {
    name: "text",
    label: "Texte",
    emoji: "📝"
  },
  {
    name: "vcard",
    label: "vCard",
    emoji: "📎"
  },
  {
    name: "email",
    label: "Email",
    emoji: "📧"
  },
  {
    name: "call",
    label: "Appel",
    emoji: "📱"
  },
  {
    name: "sms",
    label: "SMS",
    emoji: "📱"
  },
  {
    name: "wifi",
    label: "Wifi",
    emoji: "📶"
  },
  {
    name: "paypal",
    label: "Paypal",
    emoji: "💳"
  },
  {
    name: "event",
    label: "Evénement",
    emoji: "📅"
  },
  {
    name: "social",
    label: "Social",
    emoji: "🐦",
  },
  {
    name: "crypto",
    label: "Crypto",
    emoji: "🔐",
  },
  {
    name: "scanQr",
    label: "ScanQr",
    emoji: "🔎",
  }
]