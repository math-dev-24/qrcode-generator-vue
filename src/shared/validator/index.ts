export function checkEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function checkPhone(phone: string): boolean {
  const regex = /^\+[0-9]{1,3}-[0-9]{3}-[0-9]{4}$/;
  return regex.test(phone);
}

export function checkUrl(url: string): boolean {
  const regex = /^(https?:\/\/)?(www\.)?[-\w@:%._\+~#=]{2,256}\.[a-z]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  return regex.test(url);
}
