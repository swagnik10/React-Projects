import './App.css'
import { useState, useEffect } from "react";
import Balance from "./component/Balance";
import TransactionForm from "./component/TransactionForm";
import TransactionList from "./component/TransactionList";

function App() {
  //const [transactions, setTransactions] = useState([]);
  /*const [transactions, setTransactions] = useState([
    { id: 1, text: "Salary", amount: 5000, type: "credit" },
    { id: 2, text: "Groceries", amount: 1200, type: "debit" },
  ]);*/

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [editingTransaction, setEditingTransaction] = useState(null);
  /*
    transactions = source of truth
    Only App can legally update it
    DOWN: App → Balance (via props)
    UP:   TransactionForm → App (via callback)
    Data flows DOWN, events flow UP.
  */
  const addTransaction = (transaction) => {
    //spread operator: creates a new array with the new transaction at the beginning
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );

    // If the deleted item was being edited, reset edit mode
    setEditingTransaction((prev) =>
      prev && prev.id === id ? null : prev
    );
  };

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  

  const updateTransaction = (updatedTransaction) => {
  setTransactions((prev) =>
    prev.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    )
  );
  setEditingTransaction(null); // reset edit mode
};

  return (
    <div className="app">
      <div className="container">
        <h1>Expense Tracker</h1>
        <h3>Total Transactions: {transactions.length}</h3>
        <Balance transactions={transactions} />
        {/* Parent passes a function to Child */}
        <TransactionForm
          onAddTransaction={addTransaction}
          updateTransaction={updateTransaction}
          editingTransaction={editingTransaction}
        />
        <TransactionList
          transactions={transactions}
          onDeleteTransaction={deleteTransaction}
          setEditingTransaction={setEditingTransaction}
        />
      </div>
    </div>
  )
}

export default App

/* how edit works: 
User Clicks Edit (TransactionList)
            │
            ▼
setEditingTransaction(transaction)
            │
            ▼
App State Updates (editingTransaction)
            │
            ▼
Props flow DOWN to TransactionForm
            │
            ▼
useEffect auto-fills form fields
            │
            ▼
User modifies values & clicks Submit
            │
            ▼
updateTransaction() called (to App)
            │
            ▼
transactions state updated immutably
            │
            ▼
React re-renders UI with updated data
            │
            ▼
editingTransaction reset to null (Exit Edit Mode) */
