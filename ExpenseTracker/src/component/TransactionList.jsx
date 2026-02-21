function TransactionList({ transactions, onDeleteTransaction, setEditingTransaction   }) {
  if (transactions.length === 0) {
    return <p className="empty">No transactions yet</p>;
  }
  /*
    key = unique identifier for each list item
    Helps React identify which item changed
    Optimizes re-rendering
  */
  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>

      <ul>
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={
              transaction.type === "credit"
                ? "transaction-item credit"
                : "transaction-item debit"
            }
          >
            <div className="transaction-info">
              <span className="text">{transaction.text}</span>
              <span className="amount">
                {transaction.type === "credit" ? "+" : "-"}₹
                {transaction.amount}
              </span>
            </div>

            <div className="action-buttons">
                <button
                className="edit-btn"
                onClick={() => setEditingTransaction(transaction)}
                >
                Edit
                </button>

                <button
                className="delete-btn"
                onClick={() => onDeleteTransaction(transaction.id)}
                >
                X
                </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;