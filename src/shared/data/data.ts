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
    name: "vcard",
    label: "vCard",
    emoji: "📎"
  },
  {
    name: "text",
    label: "Texte",
    emoji: "📝"
  },
  {
    name: "email",
    label: "Email",
    emoji: "📧"
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
    name: "call",
    label: "Appel",
    emoji: "📱"
  },
  {
    name: "event",
    label: "Evénement",
    emoji: "📅"
  },
  {
    name: "twitter",
    label: "Twitter",
    emoji: "🐦"
  }
]