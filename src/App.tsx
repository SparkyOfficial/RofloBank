import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProjectStore from './components/ProjectStore';
import TransactionHistory from './components/TransactionHistory';
import UserProfile from './components/UserProfile';

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

type CurrentView = 'dashboard' | 'store' | 'transactions' | 'profile';

const App: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: 'RofloUser',
    balance: 0,
    rofloCoin: 1000
  });
  
  const [currentView, setCurrentView] = useState<CurrentView>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [purchasedProjects, setPurchasedProjects] = useState<string[]>([]);

  useEffect(() => {
    // Initialize app data
    initializeApp();
    
    // Set up menu event listeners if running in Electron
    if (window.electronAPI) {
      window.electronAPI.onNewTransaction(() => {
        setCurrentView('transactions');
      });
      
      window.electronAPI.onShowAbout(() => {
        alert('RofloBank v1.0.0\nVirtual Currency Platform for Project Purchases');
      });
    }

    return () => {
      // Cleanup listeners
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('new-transaction');
        window.electronAPI.removeAllListeners('show-about');
      }
    };
  }, []);

  const initializeApp = async () => {
    try {
      // Load user data from Electron if available
      if (window.electronAPI) {
        const userData = await window.electronAPI.getUserData();
        setUser(prevUser => ({
          ...prevUser,
          ...userData
        }));
      }
      
      // Initialize sample projects
      const sampleProjects: Project[] = [
        {
          id: '1',
          name: 'RofloOS',
          description: 'Операционная система с юмористическим интерфейсом',
          price: 150,
          category: 'Operating System',
          image: '/assets/roflos.png',
          developer: 'RofloDev'
        },
        {
          id: '2',
          name: 'RofloChat',
          description: 'Мессенджер с мемами и стикерами',
          price: 75,
          category: 'Communication',
          image: '/assets/roflochat.png',
          developer: 'RofloDev'
        },
        {
          id: '3',
          name: 'RofloGames Pack',
          description: 'Коллекция забавных мини-игр',
          price: 200,
          category: 'Games',
          image: '/assets/roflogames.png',
          developer: 'RofloGames'
        },
        {
          id: '4',
          name: 'RofloEditor',
          description: 'Текстовый редактор с приколами',
          price: 100,
          category: 'Productivity',
          image: '/assets/rofloeditor.png',
          developer: 'RofloTools'
        }
      ];
      
      setProjects(sampleProjects);
    } catch (error) {
      console.error('Failed to initialize app:', error);
    }
  };

  const handlePurchase = async (project: Project) => {
    if (user.rofloCoin >= project.price) {
      try {
        // Process purchase through Electron API if available
        if (window.electronAPI) {
          const result = await window.electronAPI.purchaseProject({
            projectId: project.id,
            projectName: project.name,
            price: project.price
          });
          
          if (result.success) {
            setUser(prevUser => ({
              ...prevUser,
              rofloCoin: prevUser.rofloCoin - project.price
            }));
            
            setPurchasedProjects(prev => [...prev, project.id]);
            alert(`Successfully purchased ${project.name}!`);
          } else {
            alert('Purchase failed: ' + result.message);
          }
        } else {
          // Fallback for non-Electron environment
          setUser(prevUser => ({
            ...prevUser,
            rofloCoin: prevUser.rofloCoin - project.price
          }));
          
          setPurchasedProjects(prev => [...prev, project.id]);
          alert(`Successfully purchased ${project.name}!`);
        }
      } catch (error) {
        console.error('Purchase error:', error);
        alert('An error occurred during purchase');
      }
    } else {
      alert('Insufficient RofloCoins!');
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} purchasedProjects={purchasedProjects} projects={projects} />;
      case 'store':
        return (
          <ProjectStore 
            projects={projects} 
            onPurchase={handlePurchase}
            purchasedProjects={purchasedProjects}
            userBalance={user.rofloCoin}
          />
        );
      case 'transactions':
        return <TransactionHistory />;
      case 'profile':
        return <UserProfile user={user} setUser={setUser} />;
      default:
        return <Dashboard user={user} purchasedProjects={purchasedProjects} projects={projects} />;
    }
  };

  return (
    <div className="app">
      <Header 
        user={user} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
      <main className="main-content">
        {renderCurrentView()}
      </main>
    </div>
  );
};

// Extend Window interface for Electron API
declare global {
  interface Window {
    electronAPI?: {
      getUserData: () => Promise<any>;
      purchaseProject: (projectData: any) => Promise<{success: boolean; message: string}>;
      onNewTransaction: (callback: () => void) => void;
      onShowAbout: (callback: () => void) => void;
      removeAllListeners: (channel: string) => void;
    };
  }
}

export default App;