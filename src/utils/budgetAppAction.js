import { getLocalStorage } from "./localStorage";
import { addExpense, createWallet, deleteItem, deleteWallet } from "./helpers";
import { toastSuccess } from "./toastify";

export async function budgetAppAction({ request }) {
  const data = await request.formData();
  const { formAction, ...values } = Object.fromEntries(data);
  const user = getLocalStorage('CurrentUser');
  const form = document.querySelector('.budgetapp-form');

  try {
    // create a wallet
    if (formAction === 'createWallet') {
      createWallet({
        name: values.newWallet,
        amount: values.newWalletAmount,
        email: user.email,
      });

      return toastSuccess(`Wallet ${values.newWallet.toLowerCase()} created!`);
    }

    // add an expense
    if (formAction === 'addExpense') {
      addExpense({
        email: user.email,
        name: values.newExpense,
        amount: values.newExpenseAmount,
        walletID: values.newExpenseWallet,  
      });

      return toastSuccess(`Expense ${values.newExpense.toLowerCase()} added!`);
    }

    // delete expense item
    if (formAction === 'deleteExpense') {
      deleteItem({
        key: 'expenses',
        id: values.expenseID,
      });

      return toastSuccess('Expense deleted!')
    }

    // delete wallet
    if (formAction === 'deleteWallet') {
      deleteWallet(values.walletID);
      
      toastSuccess('Wallet deleted!');
    }
  } catch (error) {

    throw new Error('Hmm, seems like there was a problem doing this action.')
  } finally {
    
    if (form) {
      form.reset();
    }
  }

  return null;   
};
