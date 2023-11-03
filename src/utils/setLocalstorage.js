export default function setLocalstorage(key, value) {
  return localStorage.setItem(`${key}`, JSON.stringify(value));
}
