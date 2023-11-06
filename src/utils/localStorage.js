// get local storage
export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

// set local storage
export const setLocalstorage = ({ key, value }) => {
  return localStorage.setItem(key, JSON.stringify(value));
}

// get all (matching) items
export const getAllItems = ({ 
  category,
  key,
  value, 
}) => {
  const data = getLocalStorage(category) ?? [];
  return data.filter((item) => item[key] === value);
};