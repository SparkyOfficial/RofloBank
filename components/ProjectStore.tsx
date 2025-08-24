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
      case 'Operating System': return '💻';
      case 'Communication': return '💬';
      case 'Games': return '🎮';
      case 'Productivity': return '⚡';
      default: return '📦';
    }
  };

  return (
    <div>
      <div className="card">
        <h2>🛒 Project Store</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Browse and purchase amazing projects with your RofloCoins!
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="🔍 Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '0.75rem',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '1rem'
            }}
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '0.75rem',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              background: 'white'
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
          <span style={{ color: '#666' }}>
            Showing {filteredProjects.length} of {projects.length} projects
          </span>
          <span style={{ fontWeight: 'bold', color: '#667eea' }}>
            💰 Your Balance: {userBalance} RC
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
                  color: '#666', 
                  marginBottom: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>👨‍💻 {project.developer}</span>
                  <span>⭐ 4.8/5</span>
                </div>
                
                <button
                  className={`purchase-button ${isPurchased ? 'purchased' : ''}`}
                  onClick={() => !isPurchased && onPurchase(project)}
                  disabled={isPurchased || !canAfford}
                >
                  {isPurchased 
                    ? '✅ Owned' 
                    : !canAfford 
                      ? '💸 Insufficient Funds' 
                      : `🛒 Buy for ${project.price} RC`
                  }
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="card" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h3>😕 No projects found</h3>
          <p style={{ color: '#666', marginTop: '1rem' }}>
            Try adjusting your search criteria or browse different categories.
          </p>
        </div>
      )}

      <div className="card" style={{ marginTop: '2rem', background: 'rgba(102, 126, 234, 0.1)' }}>
        <h3>💡 Pro Tips</h3>
        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', color: '#666' }}>
          <li>Browse by category to find projects that interest you most</li>
          <li>Use the search function to quickly find specific projects</li>
          <li>Check your balance before making purchases</li>
          <li>Purchased projects will appear in your dashboard</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectStore;