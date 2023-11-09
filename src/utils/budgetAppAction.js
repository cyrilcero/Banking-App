import { getLocalStorage } from "./localStorage";
import { addExpense, createWallet, deleteItem, deleteWallet } from "./helpers";
import { toastError, toastSuccess } from "./toastify";
import { balanceUpdateFromAdd, balanceUpdateFromDelete } from "./helpers"; // Import the functions from the helpers module

export async function budgetAppAction({ request }) {
  const data = await request.formData();
  const { formAction, ...values } = Object.fromEntries(data);
  const form = document.querySelector(".budgetapp-form");
  const user = getLocalStorage("CurrentUser");

  try {
    if (formAction === "createWallet" && values.newWalletAmount > 0) {
      if (values.newWalletAmount > user.accountBalance) {
        return toastError("Wallet must be less than your available balance");
      }
      createWallet({
        name: values.newWallet,
        amount: values.newWalletAmount,
        email: user.email,
      });
      return toastSuccess(`Wallet ${values.newWallet.toLowerCase()} created!`);
    }

    if (formAction === "createWallet" && values.newWalletAmount <= 0) {
      return toastError("Wallet must be greater than 0!");
    }

    if (formAction === "addExpense" && values.newExpenseAmount > 0) {
      addExpense({
        email: user.email,
        name: values.newExpense,
        amount: values.newExpenseAmount,
        walletID: values.newExpenseWallet,
      });
      balanceUpdateFromAdd(user, values); // Use the imported function
      return toastSuccess(`Expense ${values.newExpense.toLowerCase()} added!`);
    }

    if (formAction === "addExpense" && values.newExpenseAmount <= 0) {
      return toastError("Expense must be greater than 0!");
    }

    if (formAction === "deleteExpense") {
      balanceUpdateFromDelete(user, values); // Use the imported function
      deleteItem({
        key: "expenses",
        id: values.expenseID,
      });
      return toastSuccess("Expense deleted!");
    }

    if (formAction === "deleteWallet") {
      deleteWallet(values.walletID);
      return toastSuccess("Wallet deleted!");
    }
  } catch (error) {
    throw new Error("Hmm, it seems like there was a problem doing this action.");
  } finally {
    if (form) {
      form.reset();
    }
    return null;
  }
}
