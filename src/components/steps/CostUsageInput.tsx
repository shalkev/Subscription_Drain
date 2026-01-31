import { useCalculator } from '../../context/CalculatorContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function CostUsageInput() {
    const { subscriptions, updateSubscription, nextStep, prevStep } = useCalculator();

    return (
        <div className="step-selection">
            <h2 className="step-title">Kosten & Nutzung</h2>
            <p className="step-description">Passe die monatlichen Kosten und deine Nutzungshäufigkeit an.</p>

            <div className="cost-usage-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {subscriptions.map(sub => (
                    <div key={sub.id} className="cost-usage-item" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>{sub.icon}</span>
                            <span style={{ fontWeight: '600' }}>{sub.name}</span>
                        </div>
                        <div className="input-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                            <div className="input-group">
                                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Monatspreis (€)</label>
                                <input
                                    type="number"
                                    value={sub.monthlyPrice}
                                    onChange={(e) => updateSubscription(sub.id, { monthlyPrice: parseFloat(e.target.value) || 0 })}
                                    step="0.01"
                                    className="custom-input price-input"
                                    style={{
                                        fontSize: '1.8rem',
                                        padding: '0.75rem',
                                        fontWeight: '700',
                                        color: '#ef4444',
                                        width: '100%',
                                        textAlign: 'center',
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        border: '2px solid rgba(239, 68, 68, 0.3)'
                                    }}
                                />
                            </div>
                            <div className="input-group">
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Nutzung: {sub.usageFrequency}%</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={sub.usageFrequency}
                                    onChange={(e) => updateSubscription(sub.id, { usageFrequency: parseInt(e.target.value) })}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="step-navigation">
                <button className="nav-button secondary" onClick={prevStep}>
                    <ArrowLeft size={18} /> Zurück
                </button>
                <button className="nav-button primary" onClick={nextStep}>
                    Weiter <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}
