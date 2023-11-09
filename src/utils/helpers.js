import { getAllItems, getLocalStorage, setLocalStorage } from "./localStorage";

// delete item
export const deleteItem = ({ key, id }) => {
  const existingData = getLocalStorage(key);

  if (id) {
    const newData = existingData.filter((item) => item.id !== id);

    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// delete wallet
export function deleteWallet(walletID) {
  const wallets = getLocalStorage("wallets");
  const expenses = getLocalStorage("expenses");

  const updatedWallets = wallets.filter((w) => w.id !== walletID);
  const updatedExpenses = expenses.filter((e) => e.walletID !== walletID);

  localStorage.setItem("wallets", JSON.stringify(updatedWallets));
  localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
}

// create wallet
export const createWallet = ({ email, name, amount }) => {
  const newItem = {
    email,
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
  };

  const existingWallets = getLocalStorage("wallets") ?? [];
  return localStorage.setItem(
    "wallets",
    JSON.stringify([...existingWallets, newItem])
  );
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
  };

  const existingExpenses = getLocalStorage("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// total spent per budget
export const calcSpentPerWallet = (walletID) => {
  const expenses = getLocalStorage("expenses") ?? [];
  const walletSpent = expenses.reduce((total, expense) => {
    if (expense.walletID !== walletID) {
      return total;
    } else {
      return (total + expense.amount); 
    }
  }, 0);

  return walletSpent;
};

// total spent per user
export const calcSpentPerUser = (email) => {
  const expenses = getLocalStorage("expenses") ?? [];
  const totalExpenses = expenses.reduce((total, expense) => {
      if (expense.email === email) {
        return (total + expense.amount);
      }      
    }, 0);

  return totalExpenses;
};

// balance update
export const balanceUpdateFromAdd = (user, values) => {    
  const allAccounts = getLocalStorage("UserAccounts");    
  user.accountBalance -= values.newExpenseAmount;  

  setLocalStorage("CurrentUser", user);  
  const updatedAccounts = allAccounts.map((item) => {
    if (user.email === item.email) {
      return { ...item, accountBalance: user.accountBalance };
    }
    return item;
  });
  setLocalStorage("UserAccounts", updatedAccounts);
}

export const balanceUpdateFromDelete = (user, values) => {
  const allAccounts = getLocalStorage("UserAccounts");
  const expenseItem = getAllItems({
    category: "expenses",
    key: "id",
    value: values.expenseID,
  });
  user.accountBalance += expenseItem[0].amount;
  setLocalStorage("CurrentUser", user);

  const updatedAccounts = allAccounts.map((item) => {
    if (user.email === item.email) {
      return { ...item, accountBalance: user.accountBalance };
    }
    return item;
  });

  setLocalStorage("UserAccounts", updatedAccounts);
}

// Format percentage
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "PHP",
  });
};

// Format createdAt
export const formatCreatedAt = (date) => new Date(date).toLocaleDateString();
