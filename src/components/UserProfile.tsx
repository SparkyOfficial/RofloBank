import React, { useState } from 'react';

interface User {
  username: string;
  balance: number;
  rofloCoin: number;
}

interface UserProfileProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user.username);
  const [depositAmount, setDepositAmount] = useState('');

  const handleSaveProfile = () => {
    setUser(prevUser => ({
      ...prevUser,
      username: editedUsername
    }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedUsername(user.username);
    setIsEditing(false);
  };

  const handleDeposit = () => {
    const amount = parseInt(depositAmount);
    if (amount > 0 && amount <= 10000) {
      setUser(prevUser => ({
        ...prevUser,
        rofloCoin: prevUser.rofloCoin + amount
      }));
      setDepositAmount('');
      alert(`Successfully deposited ${amount} RofloCoins!`);
    } else {
      alert('Please enter a valid amount (1-10000 RC)');
    }
  };

  const accountLevel = user.rofloCoin >= 5000 ? 'Premium' : user.rofloCoin >= 1000 ? 'Advanced' : 'Beginner';
  const nextLevelThreshold = user.rofloCoin >= 5000 ? null : user.rofloCoin >= 1000 ? 5000 : 1000;

  return (
    <div>
      <div className="card">
        <h2>👤 User Profile</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Manage your account settings and view your RofloBank status.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>📋 Account Information</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Username:
              </label>
              {isEditing ? (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: '5px',
                      border: '1px solid #ddd'
                    }}
                  />
                  <button
                    onClick={handleSaveProfile}
                    style={{
                      background: '#4caf50',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    ✅
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    style={{
                      background: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    ❌
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.1rem' }}>{user.username}</span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="nav-button"
                    style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}
                  >
                    ✏️ Edit
                  </button>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Account Level:
              </label>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.5rem',
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: '5px'
              }}>
                <span style={{ fontSize: '1.2rem' }}>
                  {accountLevel === 'Premium' ? '👑' : accountLevel === 'Advanced' ? '⭐' : '🌟'}
                </span>
                <span style={{ fontWeight: 'bold', color: '#667eea' }}>{accountLevel}</span>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Member Since:
              </label>
              <span>Today</span>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>💰 RofloCoins Management</h3>
            
            <div style={{ 
              background: 'rgba(102, 126, 234, 0.1)',
              padding: '1rem',
              borderRadius: '10px',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
                {user.rofloCoin} RC
              </div>
              <div style={{ color: '#666' }}>Current Balance</div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Quick Deposit:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="number"
                  placeholder="Amount (1-10000)"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  min="1"
                  max="10000"
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '5px',
                    border: '1px solid #ddd'
                  }}
                />
                <button
                  onClick={handleDeposit}
                  className="purchase-button"
                  style={{ width: 'auto', padding: '0.5rem 1rem' }}
                  disabled={!depositAmount || parseInt(depositAmount) <= 0}
                >
                  💰 Deposit
                </button>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                Minimum: 1 RC • Maximum: 10,000 RC
              </div>
            </div>

            {nextLevelThreshold && (
              <div style={{ 
                padding: '1rem',
                background: 'rgba(255, 193, 7, 0.1)',
                borderRadius: '10px'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  🎯 Next Level: {nextLevelThreshold === 1000 ? 'Advanced' : 'Premium'}
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  Need {nextLevelThreshold - user.rofloCoin} more RC
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  background: '#eee', 
                  borderRadius: '4px',
                  marginTop: '0.5rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(user.rofloCoin / nextLevelThreshold) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>🎨 Account Customization</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <button className="purchase-button" style={{ background: 'linear-gradient(45deg, #ff5722, #e64a19)' }}>
            🎨 Change Theme
          </button>
          <button className="purchase-button" style={{ background: 'linear-gradient(45deg, #9c27b0, #7b1fa2)' }}>
            🔔 Notifications
          </button>
          <button className="purchase-button" style={{ background: 'linear-gradient(45deg, #607d8b, #455a64)' }}>
            🔒 Security Settings
          </button>
          <button className="purchase-button" style={{ background: 'linear-gradient(45deg, #795548, #5d4037)' }}>
            📊 Export Data
          </button>
        </div>
      </div>

      <div className="card">
        <h3>🏆 Achievements</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ 
            padding: '1rem', 
            textAlign: 'center',
            background: user.rofloCoin >= 1000 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            borderRadius: '10px',
            border: user.rofloCoin >= 1000 ? '2px solid #4caf50' : '1px solid #ddd'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {user.rofloCoin >= 1000 ? '🏆' : '🔒'}
            </div>
            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
              RofloCoin Collector
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>
              Earn 1000+ RC
            </div>
          </div>

          <div style={{ 
            padding: '1rem', 
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '10px',
            border: '1px solid #ddd'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
              First Purchase
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>
              Buy your first project
            </div>
          </div>

          <div style={{ 
            padding: '1rem', 
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '10px',
            border: '1px solid #ddd'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
              Project Enthusiast
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>
              Own 5+ projects
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;