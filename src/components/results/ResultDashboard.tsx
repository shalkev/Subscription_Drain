import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../logic/calculator';
import { CATEGORIES } from '../../data/subscriptions';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import html2canvas from 'html2canvas';
import { Share2, RotateCcw, XCircle, TrendingUp, ExternalLink, Instagram, Facebook, MessageCircle, Twitter, Camera } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ResultDashboard() {
    const { result, reset, investmentRate } = useCalculator();
    const [displayAmount, setDisplayAmount] = useState(0);
    const [hoveredAction, setHoveredAction] = useState<'cancel' | 'invest' | null>(null);
    const controls = useAnimation();

    const getShareText = (platform: 'whatsapp' | 'instagram' | 'facebook' | 'twitter' | 'default' = 'default') => {
        if (!result) return '';
        const savings10Years = result.investmentProjections[result.investmentProjections.length - 1].amount;
        const yearly = formatCurrency(result.wastedYearly);
        const investment = formatCurrency(savings10Years);
        const url = window.location.href;

        let emoji1 = '😲';
        let emoji2 = '🚀';

        switch (platform) {
            case 'whatsapp':
                emoji1 = '😱';
                emoji2 = '💸';
                break;
            case 'instagram':
                emoji1 = '📸'; // Camera for visual platform
                emoji2 = '✨'; // Sparkles for aesthetics
                break;
            case 'facebook':
                emoji1 = '😮'; // Surprise face
                emoji2 = '📈'; // Chart for investment context
                break;
            case 'twitter':
                emoji1 = '💀'; // Skull for "dead" money / drama
                emoji2 = '🚀'; // Rocket for crypto/tech vibes
                break;
        }

        return `Ich habe gerade herausgefunden, dass ich ${yearly} pro Jahr verschenke! ${emoji1}\n\nHätte ich das Geld investiert, wären das ${investment}! ${emoji2}\n\nWieviel Geld lässt du liegen? Check dein Sparpotenzial jetzt hier: ${url}`;
    };

    const generateShareImage = async () => {
        const element = document.querySelector('.results-dashboard') as HTMLElement;
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                backgroundColor: '#0f172a',
                scale: 2,
                useCORS: true,
                ignoreElements: (element) => element.classList.contains('share-section') || element.classList.contains('result-navigation')
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = image;
            link.download = 'mein-subscription-drain.png';
            link.click();
        } catch (err) {
            console.error("Screenshot failed", err);
            alert("Bild konnte nicht erstellt werden.");
        }
    };

    useEffect(() => {
        if (result) {
            // Schock-Effekt Animation
            let start = 0;
            const end = result.wastedYearly;
            const duration = 2000; // 2 Sekunden
            const increment = end / (duration / 16); // 60 FPS

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setDisplayAmount(end);
                    clearInterval(timer);
                    // Shake-Effekt am Ende
                    controls.start({
                        x: [0, -10, 10, -10, 10, 0],
                        transition: { duration: 0.5 }
                    });
                } else {
                    setDisplayAmount(start);
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [result, controls]);

    if (!result) return null;

    const pieData = result.categoryBreakdown.map(item => ({
        name: CATEGORIES[item.category as keyof typeof CATEGORIES]?.label || item.category,
        value: item.amount,
        color: CATEGORIES[item.category as keyof typeof CATEGORIES]?.color || '#3b82f6',
    }));

    const lineData = result.investmentProjections.map(p => ({
        year: `Jahr ${p.years}`,
        value: p.amount,
        rawYear: p.years, // Helper for tooltip
    }));

    // Custom Tooltip for Investment Chart
    const InvestmentTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload; // Access full data object including rawYear
            const years = data.rawYear;
            const totalAmount = data.value;

            // Calculate breakdown
            const monthlyContribution = result.wastedMonthly;
            const totalContributed = monthlyContribution * 12 * years;
            const interestEarned = totalAmount - totalContributed;

            return (
                <div style={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '1rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    minWidth: '220px',
                    backdropFilter: 'blur(8px)',
                    color: '#fff'
                }}>
                    <p style={{
                        fontWeight: '700',
                        marginBottom: '0.75rem',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        paddingBottom: '0.5rem',
                        fontSize: '1rem'
                    }}>
                        {label} – Details
                    </p>

                    <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#94a3b8' }}>Gesamtsumme:</span>
                            <span style={{ fontWeight: '700', color: '#10b981', fontSize: '1.1rem' }}>
                                {formatCurrency(totalAmount)}
                            </span>
                        </div>

                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.25rem 0' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>💰 Eingezahlt:</span>
                            <span>{formatCurrency(totalContributed)}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>📈 Zinsgewinn:</span>
                            <span style={{ color: '#3b82f6' }}>+{formatCurrency(interestEarned)}</span>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '0.75rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px dashed rgba(255,255,255,0.2)',
                        fontSize: '0.75rem',
                        color: '#94a3b8',
                        lineHeight: '1.4'
                    }}>
                        <p>
                            Berechnet mit <strong>{formatCurrency(monthlyContribution)} / Monat</strong> <br />
                            zu <strong>{(investmentRate * 100).toFixed(1)}%</strong> jährlicher Rendite.
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    const handleShare = async () => {
        const text = getShareText();

        if (typeof navigator.share !== 'undefined') {
            try {
                await navigator.share({
                    title: 'Mein Subscription Drain',
                    text: text,
                    url: window.location.href
                });
            } catch (err) {
                console.error('Sharing failed', err);
            }
        } else {
            navigator.clipboard.writeText(text);
            alert('Text kopiert! 📋');
        }
    };

    return (
        <div className="results-dashboard">
            {/* Schock-Moment: Jährlicher Drain (Redesigned) */}
            <motion.div
                className="result-card shock-card"
                initial={{ scale: 0.9, opacity: 0, rotateX: 15 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 50px rgba(220, 38, 38, 0.4)",
                    borderColor: "rgba(220, 38, 38, 0.6)"
                }}
                transition={{ duration: 0.6, type: 'spring' }}
                style={{
                    background: 'rgba(15, 23, 42, 0.85)', // Dark premium background
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(220, 38, 38, 0.2)', // Subtle red border
                    borderRadius: '24px',
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                    transformStyle: 'preserve-3d',
                    marginBottom: '3rem'
                }}
            >
                {/* Ambient Red Glow Background */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%',
                    height: '120%',
                    background: 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }} />

                {/* Animated Pulse Ring */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '300px',
                        height: '300px',
                        border: '1px solid rgba(220, 38, 38, 0.1)',
                        borderRadius: '50%',
                        zIndex: 0,
                        pointerEvents: 'none'
                    }}
                />

                <h2 style={{
                    position: 'relative',
                    zIndex: 1,
                    fontSize: '1.4rem',
                    color: '#cbd5e1',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    fontWeight: '500'
                }}>
                    <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        style={{ filter: 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.6))', display: 'inline-block' }}
                    >🔥</motion.span>
                    Dein jährlicher Drain
                </h2>

                <motion.div
                    className="wasted-amount"
                    animate={controls}
                    whileHover={{ scale: 1.1, textShadow: "0 0 40px rgba(220, 38, 38, 1)" }}
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        fontSize: '5rem', // Massive Impact
                        fontWeight: '900',
                        // Gradient Text for "Wow"
                        background: 'linear-gradient(to bottom, #f87171, #dc2626)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                        marginBottom: '0.5rem',
                        cursor: 'default',
                        lineHeight: 1.1
                    }}
                >
                    {formatCurrency(displayAmount)}
                </motion.div>

                <p style={{ position: 'relative', zIndex: 1, fontSize: '1.1rem', color: '#94a3b8' }}>
                    Das verbrennst du durch ungenutzte Abos – <strong style={{ color: '#fff' }}>pro Jahr!</strong>
                </p>

                {/* Investment Potential Teaser */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 2.2 }}
                    style={{
                        marginTop: '2rem',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    <p style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 'bold', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Dein Reichtum-Potenzial
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        style={{
                            fontSize: '2.5rem',
                            fontWeight: '800',
                            color: '#10b981',
                            textShadow: '0 0 25px rgba(16, 185, 129, 0.3)',
                            cursor: 'pointer'
                        }}
                    >
                        {formatCurrency(result.investmentProjections[result.investmentProjections.length - 1].amount)}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Charts */}
            <div className="chart-grid">
                <div className="result-card">
                    <h3>Verschwendung nach Kategorie</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                    formatter={(value: any) => formatCurrency(value)}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#ffffff' }}>
                        {pieData.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                <span>• {item.name}</span>
                                <strong>{formatCurrency(item.value)}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="result-card">
                    <h3>Investitions-Potenzial (10 Jahre)</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lineData}>
                                <XAxis dataKey="year" stroke="#94a3b8" style={{ fontSize: '0.75rem' }} />
                                <YAxis hide />
                                <Tooltip content={<InvestmentTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    dot={{ fill: '#10b981', r: 4 }}
                                    animationDuration={2000}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <p style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>
                        {formatCurrency(result.investmentProjections[result.investmentProjections.length - 1].amount)}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Das hättest du in 10 Jahren, wenn du das Geld investiert hättest!
                    </p>
                </div>
            </div>

            {/* Action Buttons: Abo kündigen & Investieren */}
            <div className="action-section" style={{
                margin: '3rem 0 2rem',
                padding: '2rem',
                background: 'rgba(59, 130, 246, 0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
                <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Jetzt handeln!</h3>
                {/* 
                   KONFIGURATION: AFFILIATE LINKS
                   Hier können Sie Ihre eigenen Partner-Links hinterlegen.
                   Ändern Sie einfach die URL in den Anführungszeichen.
                */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem'
                }}>
                    {/* Kündigen Button Container */}
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setHoveredAction('cancel')}
                        onMouseLeave={() => setHoveredAction(null)}
                    >
                        <AnimatePresence>
                            {hoveredAction === 'cancel' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        position: 'absolute',
                                        bottom: '100%',
                                        left: '50%',
                                        x: '-50%',
                                        marginBottom: '12px',
                                        width: 'max-content',
                                        maxWidth: '280px',
                                        background: 'rgba(220, 38, 38, 0.95)', // Red tint for urgency
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '12px',
                                        padding: '12px 16px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                        zIndex: 20,
                                        pointerEvents: 'none',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-6px',
                                        left: '50%',
                                        marginLeft: '-6px',
                                        width: '12px',
                                        height: '12px',
                                        background: 'inherit',
                                        transform: 'rotate(45deg)',
                                        borderBottom: '1px solid rgba(255,255,255,0.2)',
                                        borderRight: '1px solid rgba(255,255,255,0.2)'
                                    }} />
                                    <p style={{ fontWeight: '700', fontSize: '0.95rem', color: '#fff', marginBottom: '4px' }}>
                                        Schluss mit Papierkram! 📄🚫
                                    </p>
                                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.4' }}>
                                        Kündige rechtssicher in <span style={{ textDecoration: 'underline decoration-yellow-400' }}>unter 2 Minuten</span>.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <a
                            href="https://www.volders.de/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-button cancel"
                            style={{ textDecoration: 'none', width: '100%', height: '100%' }}
                        >
                            <XCircle size={24} />
                            <div>
                                <strong>Abos kündigen</strong>
                                <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: '0.25rem 0 0' }}>
                                    Verwalte & kündige deine Verträge
                                </p>
                            </div>
                            <ExternalLink size={16} />
                        </a>
                    </div>

                    {/* Investieren Button Container */}
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setHoveredAction('invest')}
                        onMouseLeave={() => setHoveredAction(null)}
                    >
                        <AnimatePresence>
                            {hoveredAction === 'invest' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        position: 'absolute',
                                        bottom: '100%',
                                        left: '50%',
                                        x: '-50%',
                                        marginBottom: '12px',
                                        width: 'max-content',
                                        maxWidth: '280px',
                                        background: 'rgba(16, 185, 129, 0.95)', // Green tint for money/growth
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '12px',
                                        padding: '12px 16px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                        zIndex: 20,
                                        pointerEvents: 'none',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-6px',
                                        left: '50%',
                                        marginLeft: '-6px',
                                        width: '12px',
                                        height: '12px',
                                        background: 'inherit',
                                        transform: 'rotate(45deg)',
                                        borderBottom: '1px solid rgba(255,255,255,0.2)',
                                        borderRight: '1px solid rgba(255,255,255,0.2)'
                                    }} />
                                    <p style={{ fontWeight: '700', fontSize: '0.95rem', color: '#fff', marginBottom: '4px' }}>
                                        Lass Geld für dich arbeiten! 📈
                                    </p>
                                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.4' }}>
                                        Sichere dir <span style={{ fontWeight: 'bold', color: '#fbbf24' }}>4% Zinsen</span> statt 0% auf dem Girokonto.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <a
                            href="https://traderepublic.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-button invest"
                            style={{ textDecoration: 'none', width: '100%', height: '100%' }}
                        >
                            <TrendingUp size={24} />
                            <div>
                                <strong>Jetzt investieren</strong>
                                <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: '0.25rem 0 0' }}>
                                    Starte in deine finanzielle Zukunft
                                </p>
                            </div>
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Social Sharing Section */}
            <div className="share-section" style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '16px' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>
                    Ergebnis teilen & Speichern
                </h4>
                <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>

                    {/* WhatsApp */}
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(getShareText('whatsapp'))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-btn whatsapp"
                        style={{ background: '#25D366', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Per WhatsApp senden"
                    >
                        <MessageCircle size={22} />
                    </a>

                    {/* Screenshot Download */}
                    <button
                        onClick={generateShareImage}
                        className="share-btn download"
                        style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Als Bild speichern (Screenshot)"
                    >
                        <Camera size={22} />
                    </button>

                    {/* Instagram / Copy Text */}
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(getShareText('instagram'));
                            alert('Text kopiert! 📸 Erstelle jetzt ein Foto deines Ergebnisses (Kamera-Icon) für deine Insta Story!');
                        }}
                        className="share-btn instagram"
                        style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Text für Insta Story kopieren"
                    >
                        <Instagram size={22} />
                    </button>

                    {/* Facebook */}
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(getShareText('facebook'))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-btn facebook"
                        style={{ background: '#1877F2', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Auf Facebook teilen"
                    >
                        <Facebook size={22} />
                    </a>

                    {/* Twitter/X */}
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText('twitter'))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-btn twitter"
                        style={{ background: '#000000', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Auf X (Twitter) posten"
                    >
                        <Twitter size={22} />
                    </a>

                    {/* Native Share (Mobile) */}
                    {typeof navigator.share !== 'undefined' && (
                        <button
                            onClick={handleShare}
                            className="share-btn native"
                            style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Mehr Optionen"
                        >
                            <Share2 size={22} />
                        </button>
                    )}
                </div>
                <p style={{ textAlign: 'center', fontSize: '0.75rem', opacity: 0.6, marginTop: '1rem' }}>
                    📸 Tipp: Nutze das Kamera-Icon, um ein Bild für deine Story zu erstellen!
                </p>
            </div>

            {/* Navigation Buttons */}
            <div className="result-navigation" style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                marginTop: '1.5rem'
            }}>
                <button className="nav-button primary" onClick={reset}>
                    <RotateCcw size={18} /> Neu berechnen
                </button>
            </div>
        </div >
    );
}
