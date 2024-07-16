
export function mailto(email: string,subject:string, content: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(content)}`
}