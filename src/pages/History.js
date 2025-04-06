import React, { useState, useEffect } from 'react';
import './History.css';

function History() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      // Temporary mock data until backend is ready
      const mockTransactions = [
        {
          id: 1,
          date: '2024-01-20',
          amount: 1500,
          description: 'Brass Fittings',
          status: 'completed'
        },
        {
          id: 2,
          date: '2024-01-15',
          amount: 2300,
          description: 'Industrial Components',
          status: 'completed'
        },
        {
          id: 3,
          date: '2024-01-10',
          amount: 1800,
          description: 'Decorative Items',
          status: 'completed'
        }
      ];

      setTransactions(mockTransactions);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transaction history');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="history">
        <div className="loading">Loading transaction history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="history">
      <h1>Transaction History</h1>
      <div className="history-list">
        {transactions.map(transaction => (
          <div key={transaction.id} className="history-item">
            <h3>{transaction.description}</h3>
            <p className="amount">${transaction.amount}</p>
            <p className="date">{new Date(transaction.date).toLocaleDateString()}</p>
            <span className={`status ${transaction.status}`}>
              {transaction.status}
            </span>
          </div>
        ))}
        {transactions.length === 0 && (
          <div className="no-transactions">
            No transactions found
          </div>
        )}
      </div>
    </div>
  );
}

export default History;