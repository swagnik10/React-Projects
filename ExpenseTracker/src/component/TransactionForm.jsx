import { useState, useEffect } from "react";

function TransactionForm({ onAddTransaction, updateTransaction, editingTransaction }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("credit");

  useEffect(() => {
    if (editingTransaction) {
      setText(editingTransaction.text);
      setAmount(editingTransaction.amount);
      setType(editingTransaction.type);
    }
    else {
      // Reset form when edit mode ends (including delete case)
      setText("");
      setAmount("");
      setType("credit");
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!text.trim() || !amount) {
      alert("Please fill all fields");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    /*
        App = Parent (holds global state)
        Form = Child (sends data upward via props)
        This pattern is called lifting state up
        onAddTransaction === addTransaction (from App)
        Child → calls function → Parent function executes → Parent state updates
    */
    //Flow of the new transaction data:
      /*             App (State Owner)
           ├── transactions (state)
           ├── setTransactions (updater)
           │
           ├── Balance (reads data)
           │
           └── TransactionForm (sends new data ↑)
                        │
                        └── calls onAddTransaction()
    */

    if (editingTransaction) {
      // ✏️ EDIT MODE
      const updatedTransaction = {
        ...editingTransaction, // keeps same id
        text: text.trim(),
        amount: Number(amount),
        type: type,
      };

      updateTransaction(updatedTransaction);
    } else {
      // ➕ ADD MODE 
      const newTransaction = {
        id: Date.now(),
        text: text.trim(),
        amount: Number(amount),
        type: type,
      };

      onAddTransaction(newTransaction);
    }

    // Reset form after submit
    setText("");
    setAmount("");
    setType("credit");
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h3>
        {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
      </h3>

      <div className="form-control">
        <label>Description</label>
        <input
          type="text"
          placeholder="Enter description..."
          //controlled form:
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Amount</label>
        <input
          type="number"
          placeholder="Enter amount..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="credit">Income (Credit)</option>
          <option value="debit">Expense (Debit)</option>
        </select>
      </div>

      <button type="submit" className="btn">
        {editingTransaction ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
}

export default TransactionForm;