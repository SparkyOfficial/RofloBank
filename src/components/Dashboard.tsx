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
        <h2>◈ БАЛАНС ЛИР</h2>
        <div className="stat-number">{user.rofloCoin}</div>
        <div className="stat-label">ДОСТУПНО ЛИР</div>
      </div>

      <div className="card stats-card">
        <h2>◆ ПРОЕКТЫ</h2>
        <div className="stat-number">{purchasedProjects.length}</div>
        <div className="stat-label">В СОБСТВЕННОСТИ</div>
      </div>

      <div className="card stats-card">
        <h2>◇ ПОТРАТЫ</h2>
        <div className="stat-number">{totalSpent}</div>
        <div className="stat-label">ЛИР ПОТРАЧЕНО</div>
      </div>

      <div className="card">
        <h2>◈ ПОСЛЕДНИЕ ОПЕРАЦИИ</h2>
        {recentPurchases.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '1rem' }}>
            ► ОПЕРАЦИЙ НЕ ОБНАРУЖЕНО. ПЕРЕЙДИТЕ В КАТАЛОГ ◀
          </p>
        ) : (
          <div style={{ marginTop: '1rem' }}>
            {recentPurchases.map(project => (
              <div key={project.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                background: '#0a0a0a',
                border: '1px solid #333',
                marginBottom: '8px'
              }}>
                <div>
                  <strong>◈ {project.name}</strong>
                  <div style={{ fontSize: '0.9rem', color: '#888' }}>
                    {project.category} • {project.developer}
                  </div>
                </div>
                <div style={{ fontWeight: 'bold', color: '#00ff41' }}>
                  -{project.price} ЛИР
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2>◇ ОПЕРАТИВНЫЕ КОМАНДЫ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '1rem' }}>
          <button 
            className="purchase-button"
            onClick={() => window.location.reload()}
            style={{ background: '#1a2d1a', borderColor: '#2d5d2d', color: '#4caf50' }}
          >
            ◈ ОБНОВИТЬ ДАННЫЕ
          </button>
          <button 
            className="purchase-button"
            style={{ background: '#2d1a1a', borderColor: '#5d2d2d', color: '#ff6b35' }}
          >
            ◆ ПОПОЛНИТЬ ЛИРЫ
          </button>
          <button 
            className="purchase-button"
            style={{ background: '#1a1a2d', borderColor: '#2d2d5d', color: '#6b6bff' }}
          >
            ◇ ПРОМО-КОД
          </button>
        </div>
      </div>

      <div className="card">
        <h2>◈ СТАТИСТИКА АККАУНТА</h2>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', padding: '5px 0', borderBottom: '1px solid #333' }}>
            <span>► УРОВЕНЬ:</span>
            <strong style={{ color: '#ff6b35' }}>◈ НОВИЧОК</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', padding: '5px 0', borderBottom: '1px solid #333' }}>
            <span>► ДАТА РЕГ.:</span>
            <strong style={{ color: '#00ff41' }}>СЕГОДНЯ</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', padding: '5px 0', borderBottom: '1px solid #333' }}>
            <span>► КАТЕГОРИЯ:</span>
            <strong style={{ color: '#6b6bff' }}>{projects.length > 0 ? projects[0].category : 'ОТСУТСТВУЕТ'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
            <span>► ЦЕЛЬ:</span>
            <strong style={{ color: '#ff6b35' }}>◇ ПЕРВАЯ ПОКУПКА</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;