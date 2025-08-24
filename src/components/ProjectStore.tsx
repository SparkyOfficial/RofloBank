import React, { useState } from 'react';

interface Project {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  developer: string;
}

interface ProjectStoreProps {
  projects: Project[];
  onPurchase: (project: Project) => void;
  purchasedProjects: string[];
  userBalance: number;
}

const ProjectStore: React.FC<ProjectStoreProps> = ({ 
  projects, 
  onPurchase, 
  purchasedProjects, 
  userBalance 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getProjectIcon = (category: string) => {
    switch (category) {
      case 'Operating System': return '◈';
      case 'Communication': return '◆';
      case 'Games': return '◇';
      case 'Productivity': return '▪';
      default: return '▫';
    }
  };

  return (
    <div>
      <div className="card">
        <h2>◆ КАТАЛОГ ПРОЕКТОВ</h2>
        <p style={{ color: '#888', marginBottom: '1rem' }}>
          ► ПРОСМОТР И ПРИОБРЕТЕНИЕ ПРОЕКТОВ ЗА ЛИРЫ ◀
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="► ПОИСК ПРОЕКТОВ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '0.75rem',
              borderRadius: '0',
              border: '1px solid #444',
              fontSize: '1rem',
              background: '#0a0a0a',
              color: '#e8e8e8'
            }}
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '0.75rem',
              borderRadius: '0',
              border: '1px solid #444',
              fontSize: '1rem',
              background: '#0a0a0a',
              color: '#e8e8e8'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#888' }}>
            ► ОТОБРАЖЕНО {filteredProjects.length} ИЗ {projects.length} ПРОЕКТОВ
          </span>
          <span style={{ fontWeight: 'bold', color: '#00ff41' }}>
            ◈ БАЛАНС: {userBalance} ЛИР
          </span>
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => {
          const isPurchased = purchasedProjects.includes(project.id);
          const canAfford = userBalance >= project.price;
          
          return (
            <div key={project.id} className="project-card">
              <div className="project-image">
                {getProjectIcon(project.category)}
              </div>
              
              <div className="project-info">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-details">
                  <span className="project-price">{project.price} RC</span>
                  <span className="project-category">{project.category}</span>
                </div>
                
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#888', 
                  marginBottom: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '5px 0',
                  borderTop: '1px solid #333',
                  borderBottom: '1px solid #333'
                }}>
                  <span>► {project.developer}</span>
                  <span>◆ ОЦЕНКА: 4.8/5</span>
                </div>
                
                <button
                  className={`purchase-button ${isPurchased ? 'purchased' : ''}`}
                  onClick={() => !isPurchased && onPurchase(project)}
                  disabled={isPurchased || !canAfford}
                >
                  {isPurchased 
                    ? '◈ ПОЛУЧЕНО' 
                    : !canAfford 
                      ? '◇ НЕДОСТАТОЧНО ЛИР' 
                      : `◆ ПРИОБРЕСТИ ЗА ${project.price} ЛИР`
                  }
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="card" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h3>◇ ПРОЕКТЫ НЕ ОБНАРУЖЕНЫ</h3>
          <p style={{ color: '#888', marginTop: '1rem' }}>
            ► Проверьте критерии поиска или выберите другую категорию ◀
          </p>
        </div>
      )}

      <div className="card" style={{ marginTop: '2rem', background: '#1a1a2d', border: '2px solid #2d2d5d' }}>
        <h3>◈ ОПЕРАТИВНЫЕ УКАЗАНИЯ</h3>
        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', color: '#888' }}>
          <li>► Используйте категории для поиска нужных проектов</li>
          <li>► Применяйте функцию поиска для быстрого поиска</li>
          <li>► Проверяйте баланс перед покупкой</li>
          <li>► Приобретённые проекты отобразятся в центре управления</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectStore;