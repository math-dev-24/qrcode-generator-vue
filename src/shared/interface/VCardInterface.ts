export interface VCardInterface {
  name: string,
  surname: string,
  company: string,
  job: string,
  email: string,
  website: string,
  phone: PhoneInterface[],
  address: {
    street: string,
    city: string,
    state: string,
    zip: string,
    country: string
  }
}

export interface PhoneInterface {
  id: string,
  type: "Work" | "Home" | "Mobile" | "Fax" | "Other",
  number: string
}