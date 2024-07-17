export function checkEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function checkPhone(phone: string): boolean {
  const regex = /^\+\d{1,3}\s?\d{4,14}$/;
  return regex.test(phone);
}

export function checkUrl(url: string): boolean {
  const regex = /^(https?:\/\/)?(www\.)?[-\w@:%._\+~#=]{2,256}\.[a-z]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  return regex.test(url);
}

export function checkPhoneType(type: string): boolean {
  return ["Work", "Home", "Mobile", "Fax", "Other"].includes(type);
}