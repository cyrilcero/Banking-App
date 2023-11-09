import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import Select from "react-select";
import { toastError, toastSuccess } from "../utils/toastify";

function Inputs({ type, name, placeholder, text, value, onChange }) {
  return (
    <div className="cashin-input-container">
      <label>{text}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

function CashInAdminFromUserToUser() {
  //useStates
  const [fromSelectedAccount, setFromSelectedAccount] = useState(null);
  const [toSelectedAccount, setToSelectedAccount] = useState(null);
  const [inputValue, setInputValue] = useState({
    lastTopUp: "",
    firstName: "",
    lastName: "",
    email: "",
    accountBalance: "",
    accountID: "",
  });
  const [existingAccount, setExistingAccount] = useState(true);
  const [negativeAmount, setNegativeAmount] = useState(false);

  const dropDownOverAllSelection = JSON.parse(
    localStorage.getItem("UserAccounts")
  );
  const dropDownClientSelection = dropDownOverAllSelection.filter(
    (items) => items.isAdmin === false
  );
  const dropDownItems = dropDownClientSelection.map((items) => ({
    value: [
      items.accountID,
      items.email,
      items.firstName,
      items.lastName,
      items.accountBalance,
    ],
    label: `${items.firstName} ${items.lastName} - ${items.email} `,
  }));
 
  //onChange
  const handleChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setExistingAccount(true);
    setNegativeAmount(false);
  };

  const handleFromSelect = (selected) => {
    setFromSelectedAccount(selected);
    setInputValue((prev) => ({
      ...prev,
      fromAccountID: selected.value[0],
      email: selected.value[1],
      firstName: selected.value[2],
      lastName: selected.value[3],
      accountBalance: "",
    }));
  };

  const handleToSelect = (selected) => {
    setToSelectedAccount(selected);
    setInputValue((prev) => ({
      ...prev,
      toAccountID: selected.value[0],
      email: selected.value[1],
      firstName: selected.value[2],
      lastName: selected.value[3],
      accountBalance: "",
    }));
  };
  //useEffect
  useEffect(() => {
    const existingUserAccounts = JSON.parse(
      localStorage.getItem("UserAccounts")
    );

    if (!existingUserAccounts) {
      localStorage.setItem("UserAccounts", JSON.stringify([]));
    }
  }, [inputValue]);

  //onclick
  function validateInput(inputValue) {
    const { accountBalance } = inputValue;
    if (Number.isNaN(accountBalance) || parseFloat(accountBalance) < 0) {
      setNegativeAmount(true);
      return false;
    }
    return true;
  }

  //onSubmit form
  function submitHandle(e) {
    e.preventDefault();
  
    if (!validateInput(inputValue)) {
      return;
    }
  
    const fromAccountID = fromSelectedAccount ? fromSelectedAccount.value[0] : null;
    const toAccountID = toSelectedAccount ? toSelectedAccount.value[0] : null;
    const userAccount = { ...inputValue };
    const userAccounts = JSON.parse(localStorage.getItem("UserAccounts"));

    const senderAccount = userAccounts.find(
      (user) =>
        user.accountID === fromAccountID && user.isAdmin === false
    );
  
    const receiverAccount = userAccounts.find(
      (user) =>
        user.accountID === toAccountID && user.isAdmin === false
    );
  
    if (!senderAccount || !receiverAccount) {
      setExistingAccount(false);
      return;
    }
    
    if (fromAccountID === toAccountID) {
        toastError("Sender and receiver cannot have the same account ID.");
        return;
      }
  
    const amount = parseFloat(userAccount.accountBalance);

    if (amount > senderAccount.accountBalance) {
        toastError("Insufficient balance for money transferring.");
        return;
      }

    if (amount <= senderAccount.accountBalance) {
    
      senderAccount.accountBalance -= amount;
      receiverAccount.accountBalance = (parseFloat(receiverAccount.accountBalance) + amount).toFixed(2); // Round to 2 decimal places
  
   
      localStorage.setItem("UserAccounts", JSON.stringify(userAccounts));

      const localDate = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        hour12: false,
      });  

      const transaction = {
        sender: senderAccount.email,
        amount: inputValue.accountBalance,
        recipientEmail: receiverAccount.email,
        date: localDate,
        transfer: true,
        type: "Money Transfer",
        accountName:"Admin",
      };

      const cashInHistory =
        JSON.parse(localStorage.getItem("CashInHistory")) || [];
      cashInHistory.push(transaction);
      localStorage.setItem("CashInHistory", JSON.stringify(cashInHistory));


      toastSuccess("Money sent successfully!");
    } else {
    
      setNegativeAmount(true);
      return;
    }
    

    setInputValue({
      lastTopUp: "",
      firstName: "",
      lastName: "",
      email: "",
      accountBalance: "",
    });

    setFromSelectedAccount(null);
    setToSelectedAccount(null);
  }

  return (
    <Form method="GET" className="admin-cashin-account" onSubmit={submitHandle}>
      <h2>Transfer Money</h2>

      <label className="form-labels" htmlFor="accountSelector">From:</label>
      <Select
       className="select-input"
       value={fromSelectedAccount}
       onChange={handleFromSelect}
       options={dropDownItems}
       isDisabled={false}
       isLoading={false}
       isClearable={false}
       isRtl={false}
       isSearchable={true}
       name="fromAccountID"
     />
    <label className="form-labels" htmlFor="accountSelector">To:</label>
      <Select
        className="select-input"
        value={toSelectedAccount}
        onChange={handleToSelect}
        options={dropDownItems}
        isDisabled={false}
        isLoading={false}
        isClearable={false}
        isRtl={false}
        isSearchable={true}
        name="toAccountID"
      />
      <Inputs
        text="Amount"
        type="text"
        placeholder="0.00"
        name="accountBalance"
        value={inputValue.accountBalance}
        onChange={handleChange}
      />
      {negativeAmount && <span>*Amount must be a positive number.</span>}
      <button type="submit">
        <h3>Send</h3>
      </button>
      {!existingAccount && (
        <span>*Account does not exist. Create a new account.</span>
      )}
    
    </Form>

    
  );
}

export default CashInAdminFromUserToUser;
