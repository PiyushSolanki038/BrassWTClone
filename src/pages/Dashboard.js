import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [userData, setUserData] = useState({
    recentPayments: [],
    totalTransactions: 0,
    accountBalance: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { 'x-auth-token': token }
        });
        setUserData(res.data);
      } catch (err) {
        console.error(err.response.data.msg);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Transactions</h3>
          <p>{userData.totalTransactions}</p>
        </div>
        <div className="stat-card">
          <h3>Account Balance</h3>
          <p>${userData.accountBalance}</p>
        </div>
      </div>
      <div className="recent-activity">
        <h2>Recent Payments</h2>
        <div className="payment-list">
          {userData.recentPayments.map(payment => (
            <div key={payment._id} className="payment-item">
              <p className="amount">${payment.amount}</p>
              <p className="date">{new Date(payment.date).toLocaleDateString()}</p>
              <p className="status">{payment.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;