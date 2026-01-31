import { motion, AnimatePresence } from 'framer-motion';
import { useCalculator } from '../../context/CalculatorContext';
import { useSubscriptions } from '../../context/SubscriptionContext';
import { CATEGORIES } from '../../data/subscriptions';
import type { Subscription } from '../../data/subscriptions';
import { Check, Plus, ArrowRight, ArrowLeft, Search, X, ExternalLink, RefreshCw, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function SubscriptionSelection() {
    const { subscriptions: selectedSubscriptions, addSubscription, removeSubscription, nextStep, prevStep } = useCalculator();
    const { subscriptions: availableSubscriptions, isUpdating, lastUpdated, updatePrices, updateStatus } = useSubscriptions();
    const [search, setSearch] = useState('');
    const [isCustomOpen, setIsCustomOpen] = useState(false);
    const [customApp, setCustomApp] = useState({ name: '', price: '', category: 'other' });

    const toggleSubscription = (sub: Subscription) => {
        const isSelected = selectedSubscriptions.some(s => s.id === sub.id);
        if (isSelected) {
            removeSubscription(sub.id);
        } else {
            addSubscription({
                id: sub.id,
                name: sub.name,
                category: sub.category,
                monthlyPrice: sub.defaultPrice,
                usageFrequency: 50,
                icon: sub.icon
            });
        }
    };

    const handleAddCustom = () => {
        if (!customApp.name || !customApp.price) return;

        const newId = `custom-${Date.now()}`;
        addSubscription({
            id: newId,
            name: customApp.name,
            category: customApp.category,
            monthlyPrice: parseFloat(customApp.price.replace(',', '.')),
            usageFrequency: 50,
            icon: '✨'
        });

        setCustomApp({ name: '', price: '', category: 'other' });
        setIsCustomOpen(false);
    };

    // Filter logic - use dynamic subscriptions
    const filteredSubscriptions = availableSubscriptions.filter(sub =>
        sub.name.toLowerCase().includes(search.toLowerCase())
    );

    const selectedIds = selectedSubscriptions.map(s => s.id);

    // Grouping for display
    const categories = Object.entries(CATEGORIES);

    // Identify generic subscriptions vs custom added ones
    const customSubscriptions = selectedSubscriptions.filter(s => s.id.startsWith('custom-'));

    const handleLinkClick = (e: React.MouseEvent, url?: string) => {
        e.stopPropagation();
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="step-selection">
            <div className="step-header" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <h2 className="step-title">Deine Abos</h2>
                <p className="step-description">
                    Wähle aus <strong>{availableSubscriptions.length} beliebten Abos</strong> oder füge eigene hinzu.
                </p>

                {/* Update Prices Button - nur auf Step 1 */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '1rem',
                    marginBottom: '1rem'
                }}>
                    <motion.button
                        onClick={updatePrices}
                        disabled={isUpdating}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            background: isUpdating
                                ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                                : 'linear-gradient(135deg, #10b981, #059669)',
                            border: 'none',
                            borderRadius: '10px',
                            color: 'white',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            cursor: isUpdating ? 'wait' : 'pointer',
                            boxShadow: isUpdating
                                ? '0 4px 15px rgba(99, 102, 241, 0.4)'
                                : '0 4px 15px rgba(16, 185, 129, 0.4)',
                            transition: 'all 0.3s'
                        }}
                    >
                        {isUpdating ? (
                            <>
                                <Loader2 size={18} className="spin-animation" />
                                {updateStatus || 'Aktualisiere...'}
                            </>
                        ) : (
                            <>
                                <RefreshCw size={18} />
                                🔍 Abos Liste aktualisieren
                            </>
                        )}
                    </motion.button>

                    {lastUpdated && !isUpdating && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                fontSize: '0.75rem',
                                color: 'var(--accent)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem'
                            }}
                        >
                            ✅ Preise aktualisiert: {lastUpdated.toLocaleTimeString('de-DE')}
                        </motion.div>
                    )}
                </div>

                {/* Search Bar */}
                <div style={{ position: 'relative', maxWidth: '400px', margin: '1rem auto' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                    <input
                        type="text"
                        placeholder="Netflix, Spotify, ChatGPT..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 3rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-card)',
                            color: 'white',
                            fontSize: '1rem'
                        }}
                    />
                </div>
            </div>

            {/* Custom App Button & List */}
            <div style={{ marginBottom: '2rem' }}>
                <motion.button
                    onClick={() => setIsCustomOpen(!isCustomOpen)}
                    className="action-button"
                    style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem', borderStyle: 'dashed' }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <Plus size={20} /> Eigenes Abo hinzufügen
                </motion.button>

                {/* Custom App Form */}
                <AnimatePresence>
                    {isCustomOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden', background: 'var(--bg-card)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', border: '1px solid var(--primary)' }}
                        >
                            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                                <input
                                    type="text"
                                    placeholder="Name (z.B. Fitness)"
                                    value={customApp.name}
                                    onChange={e => setCustomApp({ ...customApp, name: e.target.value })}
                                    style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-dark)', color: 'white' }}
                                />
                                <input
                                    type="number"
                                    placeholder="Preis (€)"
                                    value={customApp.price}
                                    onChange={e => setCustomApp({ ...customApp, price: e.target.value })}
                                    style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-dark)', color: 'white' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                <button onClick={handleAddCustom} className="nav-button primary" style={{ flex: 1, padding: '0.5rem' }}>Hinzufügen</button>
                                <button onClick={() => setIsCustomOpen(false)} className="nav-button secondary" style={{ padding: '0.5rem' }}><X size={18} /></button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Display Custom Added Apps */}
                {customSubscriptions.length > 0 && (
                    <div className="subscription-grid" style={{ marginBottom: '2rem' }}>
                        {customSubscriptions.map(sub => (
                            <motion.div
                                key={sub.id}
                                className="subscription-card selected"
                                layout
                            >
                                <span className="sub-icon">✨</span>
                                <span className="sub-name" style={{ color: 'white', fontWeight: 600 }}>{sub.name}</span>
                                <span className="sub-price">{sub.monthlyPrice.toFixed(2)}€</span>
                                <button
                                    onClick={() => removeSubscription(sub.id)}
                                    style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                                >
                                    <X size={16} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Standard Categories Grid */}
            <div className="categories-container">
                {categories.map(([key, cat]) => {
                    // Filter logic applied per category
                    const catSubs = filteredSubscriptions.filter(s => s.category === key);

                    if (catSubs.length === 0) return null;

                    return (
                        <div key={key} className="category-section">
                            <h3 className="category-title" style={{ color: cat.color, borderColor: cat.color }}>
                                {cat.label} <span style={{ opacity: 0.6, fontSize: '0.85rem' }}>({catSubs.length})</span>
                            </h3>
                            <div className="subscription-grid">
                                {catSubs.map(sub => {
                                    const isSelected = selectedIds.includes(sub.id);
                                    return (
                                        <motion.button
                                            key={sub.id}
                                            className={`subscription-card ${isSelected ? 'selected' : ''}`}
                                            onClick={() => toggleSubscription(sub)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{ position: 'relative' }}
                                        >
                                            {/* Logo-style icon with brand color */}
                                            <div
                                                className="sub-icon-wrapper"
                                                style={{
                                                    background: sub.logoColor ? `${sub.logoColor}20` : 'rgba(59, 130, 246, 0.1)',
                                                    borderRadius: '12px',
                                                    padding: '0.5rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: `2px solid ${sub.logoColor || 'var(--primary)'}`,
                                                    marginBottom: '0.25rem'
                                                }}
                                            >
                                                <span className="sub-icon" style={{ fontSize: '1.75rem' }}>{sub.icon}</span>
                                            </div>
                                            <span className="sub-name" style={{ color: 'white', fontWeight: 600 }}>{sub.name}</span>
                                            <span className="sub-price">{sub.defaultPrice.toFixed(2)}€</span>

                                            {/* External link to official site */}
                                            {sub.url && (
                                                <button
                                                    onClick={(e) => handleLinkClick(e, sub.url)}
                                                    className="sub-link"
                                                    title={`${sub.name} Website öffnen`}
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: '6px',
                                                        right: '6px',
                                                        background: 'rgba(255,255,255,0.1)',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        padding: '4px',
                                                        cursor: 'pointer',
                                                        color: 'var(--text-secondary)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    <ExternalLink size={12} />
                                                </button>
                                            )}

                                            <span className="sub-check">
                                                {isSelected ? <Check size={18} /> : <Plus size={18} />}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="step-navigation">
                <button className="nav-button secondary" onClick={prevStep}>
                    <ArrowLeft size={18} /> Zurück
                </button>
                <div style={{ textAlign: 'right', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {selectedSubscriptions.length} Abos • {selectedSubscriptions.reduce((acc, s) => acc + s.monthlyPrice, 0).toFixed(2)}€/Monat
                </div>
                <button
                    className="nav-button primary"
                    onClick={nextStep}
                    disabled={selectedSubscriptions.length === 0}
                >
                    Weiter <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}
