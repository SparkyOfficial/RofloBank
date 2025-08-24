import React from 'react';

interface User {
  username: string;
  balance: number;
  rofloCoin: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  developer: string;
}

interface DashboardProps {
  user: User;
  purchasedProjects: string[];
  projects: Project[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, purchasedProjects, projects }) => {
  const recentPurchases = projects.filter(project => 
    purchasedProjects.includes(project.id)
  ).slice(-3);

  const totalSpent = projects
    .filter(project => purchasedProjects.includes(project.id))
    .reduce((total, project) => total + project.price, 0);

  return (
    <div className="dashboard">
      <div className="card stats-card">
        <h2>💰 RofloCoins Balance</h2>
        <div className="stat-number">{user.rofloCoin}</div>
        <div className="stat-label">Available RC</div>
      </div>

      <div className="card stats-card">
        <h2>🛍️ Projects Owned</h2>
        <div className="stat-number">{purchasedProjects.length}</div>
        <div className="stat-label">Total Projects</div>
      </div>

      <div className="card stats-card">
        <h2>💸 Total Spent</h2>
        <div className="stat-number">{totalSpent}</div>
        <div className="stat-label">RofloCoins</div>
      </div>

      <div className="card">
        <h2>🕒 Recent Purchases</h2>
        {recentPurchases.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', marginTop: '1rem' }}>
            No purchases yet. Visit the store to buy some projects! 🛒
          </p>
        ) : (
          <div style={{ marginTop: '1rem' }}>
            {recentPurchases.map(project => (
              <div key={project.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: '10px',
                marginBottom: '0.5rem'
              }}>
                <div>
                  <strong>{project.name}</strong>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    {project.category} • {project.developer}
                  </div>
                </div>
                <div style={{ fontWeight: 'bold', color: '#667eea' }}>
                  {project.price} RC
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2>🎯 Quick Actions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
          <button 
            className="purchase-button"
            onClick={() => window.location.reload()}
            style={{ background: 'linear-gradient(45deg, #4caf50, #45a049)' }}
          >
            🔄 Refresh Data
          </button>
          <button 
            className="purchase-button"
            style={{ background: 'linear-gradient(45deg, #ff9800, #f57c00)' }}
          >
            💰 Buy More RofloCoins
          </button>
          <button 
            className="purchase-button"
            style={{ background: 'linear-gradient(45deg, #9c27b0, #7b1fa2)' }}
          >
            🎁 Redeem Promo Code
          </button>
        </div>
      </div>

      <div className="card">
        <h2>📈 Account Statistics</h2>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Account Level:</span>
            <strong>🌟 Beginner</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Member Since:</span>
            <strong>Today</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Favorite Category:</span>
            <strong>{projects.length > 0 ? projects[0].category : 'None'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Next Achievement:</span>
            <strong>🏆 First Purchase</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;