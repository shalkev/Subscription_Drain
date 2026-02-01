import { motion } from 'framer-motion';
import { useCalculator } from '../context/CalculatorContext';
import { TrendingDown, Calculator, CheckCircle } from 'lucide-react';

export function LandingHero() {
    const { setStep } = useCalculator();

    return (
        <div className="landing-hero">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="hero-content"
            >
                <div className="hero-icon">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <TrendingDown size={80} color="#ef4444" />
                    </motion.div>
                </div>
                <h1 className="hero-title">
                    Wieviel Geld <br />
                    <span style={{
                        background: 'linear-gradient(120deg, #ef4444, #f87171)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: '900'
                    }}>
                        verbrennst du unbemerkt?
                    </span>
                </h1>
                <p className="hero-subtitle" style={{ fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Die meisten schätzen ihre Kosten völlig falsch ein. 😱 <br />
                    <strong>Deck jetzt die Wahrheit auf:</strong> Was zahlst du wirklich – und wie reich könntest du eigentlich sein?
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        marginBottom: '2rem',
                        backdropFilter: 'blur(5px)',
                        boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)'
                    }}
                >
                    <CheckCircle size={20} color="#10b981" />
                    <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1rem' }}>
                        100% kostenloser Check durch AI
                    </span>
                </motion.div>

                <div></div>{/* Spacer wrapper if needed, but button follows directly */}
                <motion.button
                    className="cta-button"
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0.4)", "0 0 0 20px rgba(239, 68, 68, 0)"] }}
                    transition={{
                        boxShadow: { duration: 1.5, repeat: Infinity, repeatType: "loop" }
                    }}
                    style={{
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                        padding: '1.2rem 2.5rem',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        borderRadius: '50px',
                        border: 'none',
                        color: 'white',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
                    }}
                >
                    <Calculator size={28} />
                    Jetzt Wahrheit checken
                </motion.button>
            </motion.div>
        </div>
    );
}
