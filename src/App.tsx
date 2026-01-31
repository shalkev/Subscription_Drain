import { useState } from 'react';
import { CalculatorProvider, useCalculator } from './context/CalculatorContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { LandingHero } from './components/LandingHero';
import { SubscriptionSelection } from './components/steps/SubscriptionSelection';
import { CostUsageInput } from './components/steps/CostUsageInput';
import { InvestmentParameters } from './components/steps/InvestmentParameters';
import { ResultDashboard } from './components/results/ResultDashboard';
import { ProgressBar } from './components/ProgressBar';
import { AnimatePresence, motion } from 'framer-motion';
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
            delay: 0, // Reset delay to start fresh
            // Reset position effectively by keyframe reset or just force re-render?
            // The keyframes loop. Resetting is tricky without removing DOM node.
            // Let's just reset burning state. It will pop back in.
            // Ideally we'd reset the animation but that needs key change.
            // For this simple effect, just un-burning is fine, it will reappear.
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
      pointerEvents: 'none', // Allow clicks to pass through container
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
            fontSize: `${p.size}rem`,
            opacity: p.isBurning ? 0 : 0.7, // 70% opacity as requested
            color: p.isBurning ? '#ef4444' : '#FFD700', // Intense Gold
            textShadow: p.isBurning ? '0 0 20px #ef4444' : '0 0 20px rgba(255, 215, 0, 0.8)', // Strong Glow
            animation: p.isBurning ? 'none' : `floatUp ${p.duration}s linear infinite`,
            animationDelay: `-${p.delay}s`,
            bottom: '-20%',
            filter: p.isBurning ? 'blur(0px)' : 'none', // No blur for normal state
            pointerEvents: 'auto', // Catch clicks on the money
            cursor: 'crosshair',
            transform: p.isBurning ? 'scale(1.5)' : 'scale(1)',
            transition: 'all 0.3s ease-out',
            zIndex: p.isBurning ? 10 : 0
          }}
        >
          {p.isBurning ? '🔥' : '€'}
        </div>
      ))}
    </div>
  );
}

function Calculator() {
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
    <div className="app-container">
      <FloatingBackground />

      <header className="app-header" style={{ position: 'relative', zIndex: 1 }}>
        <div className="logo" onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>
          💸 Subscription Drain
        </div>
      </header>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '900px' }}>
        <ProgressBar totalSteps={4} />
      </div>

      <main className="app-main" style={{ position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="app-footer" style={{ position: 'relative', zIndex: 1 }}>
        <p>© 2026 Subscription Drain Kalkulator | Made with 💔 für bessere Finanzen</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <SubscriptionProvider>
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
    </SubscriptionProvider>
  );
}

export default App;
