import { useState } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const SCENARIOS = [
    {
        id: 'etf',
        label: 'ETF (7% p.a.)',
        rate: 0.07,
        color: '#10b981',
        description: 'Weltweiter Aktienmarkt (z.B. MSCI World). Solides Wachstum & breite Risikostreuung.'
    },
    {
        id: 'safe',
        label: 'Konservativ (4%)',
        rate: 0.04,
        color: '#3b82f6',
        description: 'Anleihen & Tagesgeld. Hohe Sicherheit, stabiler Werterhalt bei geringem Risiko.'
    },
    {
        id: 'high',
        label: 'Aggressiv (10%)',
        rate: 0.10,
        color: '#f59e0b',
        description: 'Tech, Krypto & Einzelaktien. Hohe Schwankungen, aber maximale Gewinnchancen.'
    },
];

export function InvestmentParameters() {
    const { investmentRate, setInvestmentRate, calculate, nextStep, prevStep } = useCalculator();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const handleNext = () => {
        calculate();
        nextStep();
    };

    return (
        <div className="step-selection">
            <h2 className="step-title">Deine Chance</h2>
            <p className="step-description">Was hättest du mit dem gesparten Geld erreichen können?</p>

            <div className="investment-scenarios" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {SCENARIOS.map(s => (
                    <div
                        key={s.id}
                        className={`subscription-card ${investmentRate === s.rate ? 'selected' : ''}`}
                        onClick={() => setInvestmentRate(s.rate)}
                        onMouseEnter={() => setHoveredId(s.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '1.5rem',
                            textAlign: 'center',
                            border: investmentRate === s.rate ? `2px solid ${s.color}` : '1px solid transparent',
                            background: investmentRate === s.rate ? `${s.color}20` : 'var(--bg-card)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            minHeight: '140px' // Ensure consistent height
                        }}
                    >
                        <span style={{ fontWeight: '700', fontSize: '1.1rem', color: s.color }}>{s.label}</span>

                        {/* Dynamic Description on Hover */}
                        <div style={{
                            maxHeight: hoveredId === s.id ? '100px' : '0',
                            opacity: hoveredId === s.id ? 1 : 0,
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            fontSize: '0.85rem',
                            marginTop: hoveredId === s.id ? '0.75rem' : '0',
                            marginBottom: hoveredId === s.id ? '0.75rem' : '0',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.4'
                        }}>
                            {s.description}
                        </div>

                        {investmentRate === s.rate && (
                            <div style={{ marginTop: hoveredId === s.id ? '0' : '0.5rem', transition: 'margin 0.3s ease' }}>
                                <Check size={24} color={s.color} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="custom-rate" style={{ marginTop: '2rem' }}>
                <label style={{ display: 'block', fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Eigene Rendite (% p.a.)</label>
                <input
                    type="number"
                    value={(investmentRate * 100).toFixed(1)}
                    onChange={(e) => setInvestmentRate(parseFloat(e.target.value) / 100)}
                    step="0.1"
                    className="custom-input"
                    style={{
                        width: '100%',
                        fontSize: '1.5rem',
                        padding: '1rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'var(--text-primary)',
                        background: 'var(--bg-card)',
                        border: '2px solid var(--border-color)'
                    }}
                />
            </div>

            <div className="step-navigation">
                <button className="nav-button secondary" onClick={prevStep}>
                    <ArrowLeft size={18} /> Zurück
                </button>
                <button className="nav-button primary" onClick={handleNext}>
                    Berechnen <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}

function Check({ size, color }: { size: number; color?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color || "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
