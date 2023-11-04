import { toast } from "react-toastify";
import { getLocalStorage } from "./localStorage";
import { addExpense, createWallet, deleteItem, deleteWallet } from "./helpers";

export async function budgetAppAction({ request }) {
  const data = await request.formData();
  const { formAction, ...values } = Object.fromEntries(data);
  const user = getLocalStorage('CurrentUser');

  // create a wallet
  if (formAction === 'createWallet') {
    try {
      createWallet({
        name: values.newWallet,
        amount: values.newWalletAmount,
        email: user.email,
      });

      return toast.success(`Wallet ${values.newWallet.toLowerCase()} created!`);
      
    } catch (error) {
      throw new Error('Hmm, seems like there is a problem creating your wallet.');
    }
  };

  // add an expense
  if (formAction === 'addExpense') {
    try {
      addExpense({
        email: user.email,
        name: values.newExpense,
        amount: values.newExpenseAmount,
        walletID: values.newExpenseWallet,  
      });

      return toast.success(`Expense ${values.newExpense.toLowerCase()} added!`);
      
    } catch (error) {
      throw new Error('Hmm, seems like there is a problem adding your expense.');
    }
  };

  // delete expense item
  if (formAction === 'deleteExpense') {
    try {
      deleteItem({
        key: 'expenses',
        id: values.expenseID,
      });

      return toast.success('Expense deleted!')
    } catch (error) {
      throw new Error("There was a problem deleting your expense.")
    }
  }

  // delete wallet
  if (formAction === 'deleteWallet') {
    try {
      deleteWallet(values.walletID);
      
      toast.success('Wallet deleted!');
    } catch (error) {
      throw new Error('There was a problem deleting your wallet.'); 
    }
  }

  return null;   
};
