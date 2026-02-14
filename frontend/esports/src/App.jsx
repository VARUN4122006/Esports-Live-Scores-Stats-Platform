import { useState, useEffect } from 'react';
import PlayerProfile from './components/PlayerProfile';
import { FollowedTeamsProvider } from './context/FollowedTeamsContext';
import { FollowedPlayersProvider } from './context/FollowedPlayersContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Games from './components/Games';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import LegalModal from './components/LegalModal';
import Dashboard from './components/Dashboard';
import FreeFirePage from './components/FreeFirePage';
import BGMIPage from './components/BGMIPage';
import ValorantPage from './components/ValorantPage';
import CS2Page from './components/CS2Page';
import Dota2Page from './components/Dota2Page';
import LoLPage from './components/LoLPage';


const LandingPage = ({ onGameSelect }) => (
  <div className="animate-fade-in">
    <Hero />
    <WhyUs />
    <Games onGameSelect={onGameSelect} />
    <Features />
    <CTA />
  </div>
);

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // 'terms' | 'privacy' | null
  const [path, setPath] = useState(window.location.pathname);
  const [user, setUser] = useState(null);


  // Initialize user from sessionStorage
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  // Custom Router Sync
  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newPath) => {
    const [purePath] = newPath.split('#');
    window.history.pushState({}, '', newPath);
    setPath(purePath);
  };

  // Handle anchor scrolling after routing/mounting
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [path]);

  return (
    <FollowedTeamsProvider>
      <FollowedPlayersProvider>
        <div className="min-h-screen bg-bg-dark text-white selection:bg-gold selection:text-bg-dark font-sans">


          <Navbar
            onSignInClick={() => setIsAuthModalOpen(true)}
            user={user}
            onLogout={handleLogout}
            showNavLinks={path === '/'}
          />

          <main className="relative">
            {path === '/' && (
              <LandingPage
                onGameSelect={(game) => {
                  const slug = game.toLowerCase().replace(/\s+/g, '');
                  navigate(`/game/${slug}`);
                }}
              />
            )}

            {path.startsWith('/player/') && (
              <div className="animate-fade-in">
                <PlayerProfile />
              </div>
            )}

            {path === '/game/freefire' && (
              <div className="animate-fade-in">
                <FreeFirePage onBack={() => navigate('/#games')} />
              </div>
            )}

            {path === '/game/battlegroundsmobileindia' && (
              <div className="animate-fade-in">
                <BGMIPage onBack={() => navigate('/#games')} />
              </div>
            )}

            {path === '/game/valorant' && (
              <div className="animate-fade-in">
                <ValorantPage onBack={() => navigate('/#games')} />
              </div>
            )}

            {path === '/game/cs2' && (
              <div className="animate-fade-in">
                <CS2Page onBack={() => navigate('/#games')} />
              </div>
            )}

            {path === '/game/dota2' && (
              <div className="animate-fade-in">
                <Dota2Page onBack={() => navigate('/#games')} />
              </div>
            )}

            {path === '/dashboard' && (
              <div className="animate-fade-in">
                <Dashboard onBack={() => navigate('/#games')} onNavigate={navigate} />
              </div>
            )}

            {path === '/game/leagueoflegends' && (
              <div className="animate-fade-in">
                <LoLPage onBack={() => navigate('/#games')} />
              </div>
            )}

            {path.startsWith('/game/') &&
              !['/game/freefire', '/game/battlegroundsmobileindia', '/game/valorant', '/game/cs2', '/game/dota2', '/game/leagueoflegends'].includes(path) && (
                <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center px-6 animate-fade-in">
                  <div className="w-24 h-24 bg-gold/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                    <span className="text-4xl">🛠️</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-gold italic">Under Construction</h2>
                  <p className="text-gray-400 mb-8 uppercase font-bold tracking-widest text-xs max-w-md">
                    The dedicated page for <span className="text-white">{path.split('/').pop().toUpperCase()}</span> is currently being forged.
                  </p>
                  <button
                    onClick={() => navigate('/#games')}
                    className="px-10 py-4 bg-white text-bg-dark font-black uppercase tracking-widest rounded-full hover:bg-gold hover:text-bg-dark transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
                  >
                    Return to Base
                  </button>
                </div>
              )}
          </main>

          <Footer onLegalClick={(type) => setLegalModal(type)} />

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
            onLegalClick={(type) => setLegalModal(type)}
          />

          <LegalModal
            isOpen={!!legalModal}
            onClose={() => setLegalModal(null)}
            type={legalModal}
          />
        </div>
      </FollowedPlayersProvider>
    </FollowedTeamsProvider>
  );
}

export default App;
