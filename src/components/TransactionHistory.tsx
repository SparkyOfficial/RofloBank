import React, { useState } from 'react';

interface Transaction {
  id: string;
  type: 'purchase' | 'deposit' | 'refund';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const TransactionHistory: React.FC = () => {
  // Sample transaction data - in a real app, this would come from a backend
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'deposit',
      amount: 1000,
      description: 'Initial RofloCoins deposit',
      date: new Date().toISOString(),
      status: 'completed'
    },
    {
      id: '2',
      type: 'purchase',
      amount: -150,
      description: 'Purchased RofloOS',
      date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      status: 'completed'
    },
    {
      id: '3',
      type: 'purchase',
      amount: -75,
      description: 'Purchased RofloChat',
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      status: 'completed'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'purchase' | 'deposit' | 'refund'>('all');

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase': return '🛒';
      case 'deposit': return '💰';
      case 'refund': return '↩️';
      default: return '📋';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'pending': return '⏳';
      case 'failed': return '❌';
      default: return '❓';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatAmount = (amount: number) => {
    return amount > 0 ? `+${amount}` : `${amount}`;
  };

  const totalIncome = transactions
    .filter(t => t.amount > 0 && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = transactions
    .filter(t => t.amount < 0 && t.status === 'completed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div>
      <div className="card">
        <h2>📋 Transaction History</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          View all your RofloBank transactions and manage your account activity.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ 
            background: 'rgba(76, 175, 80, 0.1)', 
            padding: '1rem', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4caf50' }}>
              +{totalIncome} RC
            </div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Total Income</div>
          </div>
          
          <div style={{ 
            background: 'rgba(244, 67, 54, 0.1)', 
            padding: '1rem', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f44336' }}>
              -{totalSpent} RC
            </div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Total Spent</div>
          </div>
          
          <div style={{ 
            background: 'rgba(102, 126, 234, 0.1)', 
            padding: '1rem', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
              {totalIncome - totalSpent} RC
            </div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Net Balance</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilter('all')}
            className={`nav-button ${filter === 'all' ? 'active' : ''}`}
            style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}
          >
            All
          </button>
          <button
            onClick={() => setFilter('purchase')}
            className={`nav-button ${filter === 'purchase' ? 'active' : ''}`}
            style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}
          >
            Purchases
          </button>
          <button
            onClick={() => setFilter('deposit')}
            className={`nav-button ${filter === 'deposit' ? 'active' : ''}`}
            style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}
          >
            Deposits
          </button>
          <button
            onClick={() => setFilter('refund')}
            className={`nav-button ${filter === 'refund' ? 'active' : ''}`}
            style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}
          >
            Refunds
          </button>
        </div>
      </div>

      <div className="card">
        <h3>📊 Recent Transactions</h3>
        {filteredTransactions.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', margin: '2rem 0' }}>
            No transactions found for the selected filter.
          </p>
        ) : (
          <div style={{ marginTop: '1rem' }}>
            {filteredTransactions.map(transaction => (
              <div 
                key={transaction.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '10px',
                  marginBottom: '0.5rem',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>
                    {getTransactionIcon(transaction.type)}
                  </span>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                      {transaction.description}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      {formatDate(transaction.date)}
                    </div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    fontSize: '1.1rem',
                    color: transaction.amount > 0 ? '#4caf50' : '#f44336',
                    marginBottom: '0.25rem'
                  }}>
                    {formatAmount(transaction.amount)} RC
                  </div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-end',
                    gap: '0.25rem'
                  }}>
                    {getStatusIcon(transaction.status)}
                    <span style={{ textTransform: 'capitalize' }}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ background: 'rgba(255, 193, 7, 0.1)' }}>
        <h3>⚠️ Important Notes</h3>
        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', color: '#666' }}>
          <li>All transactions are processed in RofloCoins (RC)</li>
          <li>Completed transactions cannot be reversed</li>
          <li>Refunds may take 24-48 hours to process</li>
          <li>Contact support for any transaction disputes</li>
        </ul>
      </div>
    </div>
  );
};

export default TransactionHistory;