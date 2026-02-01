import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CalculatorProvider, useCalculator } from './context/CalculatorContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { LandingHero } from './components/LandingHero';
import { SubscriptionSelection } from './components/steps/SubscriptionSelection';
import { CostUsageInput } from './components/steps/CostUsageInput';
import { InvestmentParameters } from './components/steps/InvestmentParameters';
import { ResultDashboard } from './components/results/ResultDashboard';
import { ProgressBar } from './components/ProgressBar';
import { AnimatePresence, motion } from 'framer-motion';
import { Impressum } from './components/legal/Impressum';
import { Datenschutz } from './components/legal/Datenschutz';
import { CookieBanner } from './components/CookieBanner';
import './App.css';

function FloatingBackground() {
  const [particles, setParticles] = useState(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 20,
      size: 1 + Math.random() * 3,
      isBurning: false
    }));
  });

  const burnParticle = (id: number) => {
    setParticles(prev => prev.map(p => {
      if (p.id === id && !p.isBurning) {
        return { ...p, isBurning: true };
      }
      return p;
    }));

    // Respawn particle after animation
    setTimeout(() => {
      setParticles(prev => prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            isBurning: false,
            left: Math.random() * 100,
            delay: 0,
          };
        }
        return p;
      }));
    }, 1000);
  };

  return (
    <div className="money-background" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden'
    }}>
      {particles.map((p) => (
        <div
          key={p.id}
          onMouseEnter={() => burnParticle(p.id)}
          onClick={() => burnParticle(p.id)}
          onTouchStart={() => burnParticle(p.id)}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            fontSize: `${p.isBurning ? p.size * 2 : p.size}rem`,
            opacity: p.isBurning ? 1 : 0.4,
            color: p.isBurning ? '#ef4444' : '#FFD700',
            textShadow: p.isBurning ? '0 0 30px #ef4444, 0 0 10px #ef4444' : '0 0 20px rgba(255, 215, 0, 0.8)',
            animation: `floatUp ${p.duration}s linear infinite`,
            animationPlayState: p.isBurning ? 'paused' : 'running',
            animationDelay: `-${p.delay}s`,
            bottom: '-20%',
            filter: p.isBurning ? 'blur(0px)' : 'none',
            pointerEvents: 'auto',
            cursor: 'crosshair',
            transition: 'all 0.2s ease-out',
            zIndex: p.isBurning ? 10 : 0
          }}
        >
          {p.isBurning ? '🔥' : '€'}
        </div>
      ))}
    </div>
  );
}

function Home() {
  const { currentStep } = useCalculator();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <LandingHero />;
      case 1:
        return <SubscriptionSelection />;
      case 2:
        return <CostUsageInput />;
      case 3:
        return <InvestmentParameters />;
      case 4:
        return <ResultDashboard />;
      default:
        return <LandingHero />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        style={{ width: '100%' }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
}

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="app-container">
      <FloatingBackground />

      <header className="app-header" style={{ position: 'relative', zIndex: 1 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="logo" style={{ cursor: 'pointer' }}>
            💸 Subscription Drain
          </div>
        </Link>
      </header>

      {isHome && (
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '900px' }}>
          <ProgressBar totalSteps={4} />
        </div>
      )}

      <main className="app-main" style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
        </Routes>
      </main>

      <footer className="app-footer" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', paddingBottom: '2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 1rem', fontSize: '0.75rem', opacity: 0.6, textAlign: 'center', lineHeight: '1.4' }}>
          <strong>Risikohinweis:</strong> Alle Berechnungen dienen nur der Information und stellen keine Anlageberatung oder Aufforderung zum Kauf dar. Die Ergebnisse sind Prognosen basierend auf historischen Daten und keine Garantie für die Zukunft.
        </div>
        <p>© 2026 Subscription Drain Kalkulator | Made with 💔 für bessere Finanzen</p>
        <div style={{ fontSize: '0.8rem', opacity: 0.7, display: 'flex', gap: '16px' }}>
          <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
        </div>
      </footer>
      <CookieBanner />
    </div>
  );
}

function App() {
  return (
    <Router>
      <SubscriptionProvider>
        <CalculatorProvider>
          <Layout />
        </CalculatorProvider>
      </SubscriptionProvider>
    </Router>
  );
}

export default App;
