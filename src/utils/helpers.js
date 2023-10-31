// wait for response effect
export const wait = () => new Promise(response => setTimeout(response, Math.random() * 1000));

// create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
  }    

  const existingBudgets = getLocalStorage('budgets') ?? [];
  return localStorage.setItem('budgets', JSON.stringify([...existingBudgets, newItem]));
};

// create expense
export const createExpense = ({ name, amount, budgetID }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    budgetID: budgetID
  }    

  const existingExpenses = getLocalStorage('expenses') ?? [];
  return localStorage.setItem('expenses', JSON.stringify([...existingExpenses, newItem]));
};

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

// total spent per budget
export const calcSpentPerBudget = (budgetID) => {
  const expenses = getLocalStorage('expenses') ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetID !== budgetID) {
      return acc;
    } else {
      return acc += expense.amount;
    }
  }, 0);

  return budgetSpent;
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
