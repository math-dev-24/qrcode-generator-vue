import type { PhoneInterface, VCardInterface } from '@/shared/interface/VCardInterface'

export function generateVcard(content: VCardInterface): string {
  const phones = content.phone.map((phone: PhoneInterface) => {
    return `TEL;TYPE=${phone.type}:${phone.number}`;
  }).join("\n");

  return `BEGIN:VCARD
VERSION:3.0
N:${content.surname};
FN:${content.name}
TITLE:${content.job}
${phones}
EMAIL;TYPE=PREF,INTERNET:${content.email}
ADR;TYPE=WORK:;;${content.address.street};${content.address.city};${content.address.zip};${content.address.country}
URL:${content.website}
ORG:${content.company}
END:VCARD`;
}