import React from 'react';

interface User {
  username: string;
  balance: number;
  rofloCoin: number;
}

type CurrentView = 'dashboard' | 'store' | 'transactions' | 'profile';

interface HeaderProps {
  user: User;
  currentView: CurrentView;
  setCurrentView: (view: CurrentView) => void;
}

const Header: React.FC<HeaderProps> = ({ user, currentView, setCurrentView }) => {
  return (
    <header className="header">
      <h1>РОФЛОБАНК</h1>
      
      <nav className="nav-buttons">
        <button 
          className={`nav-button ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          ЦЕНТР
        </button>
        <button 
          className={`nav-button ${currentView === 'store' ? 'active' : ''}`}
          onClick={() => setCurrentView('store')}
        >
          КАТАЛОГ
        </button>
        <button 
          className={`nav-button ${currentView === 'transactions' ? 'active' : ''}`}
          onClick={() => setCurrentView('transactions')}
        >
          ОПЕРАЦИИ
        </button>
        <button 
          className={`nav-button ${currentView === 'profile' ? 'active' : ''}`}
          onClick={() => setCurrentView('profile')}
        >
          ПРОФИЛЬ
        </button>
      </nav>
      
      <div className="user-info">
        <span>ОПЕРАТОР: {user.username}</span>
        <span className="balance">{user.rofloCoin} ЛИР</span>
      </div>
    </header>
  );
};

export default Header;