function Balance({ transactions }) {
  // Calculate totals using reduce 
  const amounts = transactions.map((t) => t.amount);

  //const totalBalance = amounts.reduce((acc, item) => acc + item, 0);

  const income = transactions
    .filter((t) => t.type === "credit")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "debit")
    .reduce((acc, t) => acc + t.amount, 0);
  
    const totalBalance = income - expense;

  return (
    <div>
      <h2>Balance: ₹{totalBalance}</h2>

      <div className="balance-summary">
        <div className="income">
          <h4>Income</h4>
          <p>₹{income}</p>
        </div>

        <div className="expense">
          <h4>Expense</h4>
          <p>₹{expense}</p>
        </div>
      </div>
    </div>
  );
}

export default Balance;