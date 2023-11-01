import { toast } from 'react-toastify';
import { createWallet, addExpense, deleteItem } from '../utils/helpers';

export async function budgetAppAction(request) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === 'createWallet') {
    try {
      createWallet({
        name: values.newWallet,
        amount: values.newWalletAmount,
      });
      return toast.success(`Wallet ${values.newWallet.toLowerCase()} created!`);
    } catch (error) {
      throw new Error('Hmm, seems like there is a problem creating your wallet.');
    }
  }

  if (_action === 'addExpense') {
    try {
      addExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        walletID: values.newExpenseWallet,
      });
      return toast.success(`Expense ${values.newExpense.toLowerCase()} added!`);
    } catch (error) {
      throw new Error('Hmm, seems like there is a problem adding your expense.');
    }
  }

  if (_action === 'deleteExpense') {
    try {
      deleteItem({
        key: 'expenses',
        id: values.expenseID,
      });
      return toast.success('Expense deleted!');
    } catch (error) {
      throw new Error('There was a problem deleting your expense.');
    }
  }
}
