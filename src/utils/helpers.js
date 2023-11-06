import { getLocalStorage } from "./localStorage";

// delete item
export const deleteItem = ({ key, id }) => {
  const existingData = getLocalStorage(key);

  if (id) {
    const newData = existingData.filter((item) => 
      item.id !== id);

      return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key)
}

// delete wallet
export function deleteWallet(walletID) {
  const wallets = getLocalStorage('wallets');
  const expenses = getLocalStorage('expenses');

  const updatedWallets = wallets.filter(w => w.id !== walletID);
  const updatedExpenses = expenses.filter(e => e.walletID !== walletID);

  localStorage.setItem('wallets', JSON.stringify(updatedWallets));
  localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
}

// wait for response effect
export const wait = () => new Promise(response => setTimeout(response, Math.random() * 1000));

// create wallet
export const createWallet = ({ email, name, amount }) => {

  const newItem = {
    email,
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
  }    

  const existingWallets = getLocalStorage('wallets') ?? [];
  return localStorage.setItem('wallets', JSON.stringify([...existingWallets, newItem]));
};

// create expense
export const addExpense = ({ email, name, amount, walletID }) => {
  const newItem = {
    email,
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    walletID,
  }    

  const existingExpenses = getLocalStorage('expenses') ?? [];
  return localStorage.setItem('expenses', JSON.stringify([...existingExpenses, newItem]));
};

// total spent per budget
export const calcSpentPerWallet = (walletID) => {
  const expenses = getLocalStorage('expenses') ?? [];
  const walletSpent = expenses.reduce((acc, expense) => {
    if (expense.walletID !== walletID) {
      return acc;
    } else {
      return acc += expense.amount;
    }
  }, 0);

  return walletSpent;
};

// total spent per user
export const calcSpentPerUser = (email) => {
  const expenses = getLocalStorage('expenses') ?? [];
  const totalExpenses = expenses
    .filter(expense => expense.email === email)
    .reduce((acc, expense) => acc + expense.amount, 0);

  return totalExpenses;
};

// Format percentage
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 0,
  });
};

// Format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: 'currency',
    currency: 'PHP',
  });
};

// Format createdAt
export const formatCreatedAt = (date) => 
  new Date(date).toLocaleDateString();