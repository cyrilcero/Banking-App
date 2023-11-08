import { getLocalStorage } from "./localStorage";
import { addExpense, createWallet, deleteItem, deleteWallet } from "./helpers";
import { toastSuccess } from "./toastify";
import { setLocalStorage } from "./localStorage";
import { getAllItems } from "./localStorage";

function balanceUpdateFromAdd() {
  const allAccounts = getLocalStorage("UserAccounts");
  const user = getLocalStorage("CurrentUser");
  user.accountBalance = user.accountBalance - values.newExpenseAmount;

  setLocalStorage("CurrentUser", user);

  const updatedAccounts = allAccounts.map((item) => {
    if (user.email === item.email) {
      return { ...item, accountBalance: user.accountBalance };
    }
    return item;
  });
  setLocalStorage("UserAccounts", updatedAccounts);
}

function balanceUpdateFromDelete() {
  const allAccounts = getLocalStorage("UserAccounts");
  const user = getLocalStorage("CurrentUser");
  const expenseItem = getAllItems({
    category: "expenses",
    key: "id",
    value: values.expenseID,
  });
  user.accountBalance = user.accountBalance + expenseItem[0].amount;
  setLocalStorage("CurrentUser", user);

  const updatedAccounts = allAccounts.map((item) => {
    if (user.email === item.email) {
      return { ...item, accountBalance: user.accountBalance };
    }
    return item;
  });
  setLocalStorage("UserAccounts", updatedAccounts);
}

export async function budgetAppAction({ request }) {
  const data = await request.formData();
  const { formAction, ...values } = Object.fromEntries(data);
  const user = getLocalStorage("CurrentUser");
  const form = document.querySelector(".budgetapp-form");

  try {
    // create a wallet
    if (formAction === "createWallet") {
      createWallet({
        name: values.newWallet,
        amount: values.newWalletAmount,
        email: user.email,
      });

      return toastSuccess(`Wallet ${values.newWallet.toLowerCase()} created!`);
    }

    // add an expense
    if (formAction === "addExpense") {
      addExpense({
        email: user.email,
        name: values.newExpense,
        amount: values.newExpenseAmount,
        walletID: values.newExpenseWallet,
      });
      balanceUpdateFromAdd();
      return toastSuccess(`Expense ${values.newExpense.toLowerCase()} added!`);
    }

    // delete expense item
    if (formAction === "deleteExpense") {
      balanceUpdateFromDelete();
      deleteItem({
        key: "expenses",
        id: values.expenseID,
      });
      return toastSuccess("Expense deleted!");
    }

    // delete wallet
    if (formAction === "deleteWallet") {
      deleteWallet(values.walletID);

      return toastSuccess("Wallet deleted!");
    }
  } catch (error) {
    throw new Error("Hmm, seems like there was a problem doing this action.");
  } finally {
    if (form) {
      form.reset();
    }

    return null;
  }
}
