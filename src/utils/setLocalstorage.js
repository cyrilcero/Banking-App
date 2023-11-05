export default function setLocalStorage(key, value) {
  return localStorage.setItem(`${key}`, JSON.stringify(value));
}
