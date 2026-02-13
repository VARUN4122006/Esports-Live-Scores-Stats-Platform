import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FollowedTeamsProvider } from './context/FollowedTeamsContext';
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
import LoaderThree from './components/ui/loader';

const LandingPage = ({ onGameSelect }) => (
  <motion.div
    key="landing-page-root"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Hero />
    <WhyUs />
    <Games onGameSelect={onGameSelect} />
    <Features />
    <CTA />
  </motion.div>
);

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // 'terms' | 'privacy' | null
  const [path, setPath] = useState(window.location.pathname);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Custom Router Sync
  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newPath) => {
    setLoading(true);
    const [purePath] = newPath.split('#');

    // Artificial delay for premium loading feel
    setTimeout(() => {
      window.history.pushState({}, '', newPath);
      setPath(purePath);
      setLoading(false);
    }, 500);
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
      }, 500); // Delay to account for AnimatePresence mode="wait" transitions
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [path]);

  return (
    <FollowedTeamsProvider>
      <div className="min-h-screen bg-esports-dark text-white selection:bg-neon-green selection:text-black font-sans">
        <LoaderThree isLoading={loading} />

        <Navbar
          onSignInClick={() => setIsAuthModalOpen(true)}
          user={user}
          onLogout={handleLogout}
          showNavLinks={path === '/'}
        />

        <main className="relative">
          <AnimatePresence mode="wait">
            {path === '/' && (
              <LandingPage
                key="route-landing"
                onGameSelect={(game) => {
                  const slug = game.toLowerCase().replace(/\s+/g, '');
                  navigate(`/game/${slug}`);
                }}
              />
            )}

            {path === '/game/freefire' && (
              <motion.div
                key="route-game-ff"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FreeFirePage onBack={() => navigate('/#games')} />
              </motion.div>
            )}

            {path === '/game/battlegroundsmobileindia' && (
              <motion.div
                key="route-game-bgmi"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BGMIPage onBack={() => navigate('/#games')} />
              </motion.div>
            )}

            {path === '/game/valorant' && (
              <motion.div
                key="route-game-valorant"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ValorantPage onBack={() => navigate('/#games')} />
              </motion.div>
            )}

            {path === '/game/cs2' && (
              <motion.div
                key="route-game-cs2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CS2Page onBack={() => navigate('/#games')} />
              </motion.div>
            )}

            {path === '/game/dota2' && (
              <motion.div
                key="route-game-dota2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Dota2Page onBack={() => navigate('/#games')} />
              </motion.div>
            )}

            {path === '/dashboard' && (
              <motion.div
                key="route-dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard onBack={() => navigate('/#games')} />
              </motion.div>
            )}

            {path === '/game/leagueoflegends' && (
              <motion.div
                key="route-game-lol"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LoLPage onBack={() => navigate('/#games')} />
              </motion.div>
            )}

            {path.startsWith('/game/') &&
              !['/game/freefire', '/game/battlegroundsmobileindia', '/game/valorant', '/game/cs2', '/game/dota2', '/game/leagueoflegends'].includes(path) && (
                <motion.div
                  key="route-fallback"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-h-screen flex flex-col items-center justify-center pt-24 text-center px-6"
                >
                  <div className="w-24 h-24 bg-neon-blue/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-neon-blue/20">
                    <span className="text-4xl">🛠️</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-neon-blue">Under Construction</h2>
                  <p className="text-gray-400 mb-8 uppercase font-bold tracking-widest text-xs max-w-md">
                    The dedicated hub for <span className="text-white">{path.split('/').pop().toUpperCase()}</span> is currently being forged.
                  </p>
                  <button
                    onClick={() => navigate('/#games')}
                    className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-neon-green transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
                  >
                    Return to Base
                  </button>
                </motion.div>
              )}
          </AnimatePresence>
        </main>

        <Footer onLegalClick={(type) => setLegalModal(type)} />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />

        <LegalModal
          isOpen={!!legalModal}
          onClose={() => setLegalModal(null)}
          type={legalModal}
        />
      </div>
    </FollowedTeamsProvider>
  );
}

export default App;
