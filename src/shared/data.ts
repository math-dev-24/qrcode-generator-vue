interface ModeInterface {
  name: string,
  path: string
}

export const MODE: ModeInterface[] = [
  {
    name: 'URL',
    path: '/url'
  },
  {
    name: 'VCard',
    path: '/v-card'
  },
  {
    name: "Texte",
    path: "/text"
  },
  {
    name: "Email",
    path: "/email"
  },
  {
    name: "SMS",
    path: "/sms"
  }
]