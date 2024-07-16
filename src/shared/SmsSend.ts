export function smsSend(phone: string, message: string): string {
  return `sms:${phone}?body=${encodeURIComponent(message)}`
}