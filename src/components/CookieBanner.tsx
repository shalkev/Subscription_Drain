import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export function CookieBanner() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent === null) {
            setShow(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShow(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'false');
        setShow(false);
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    style={{
                        position: 'fixed',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        background: 'rgba(30, 41, 59, 0.98)',
                        borderTop: '1px solid var(--border-color)',
                        padding: '1.5rem',
                        zIndex: 1000,
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 -4px 20px rgba(0,0,0,0.3)'
                    }}
                >
                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                            <p>
                                <strong>Einstellung zu Cookies</strong> <br />
                                Wir nutzen essenzielle Speichertechnologien, um die Funktionalität dieser Website zu gewährleisten (z.B. deine Eingaben im Rechner). Es werden keine Tracking-Daten an Dritte weitergegeben. Weitere Informationen finden Sie in unserer <Link to="/datenschutz" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Datenschutzerklärung</Link>.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <button
                                onClick={handleDecline}
                                className="nav-button secondary"
                                style={{
                                    fontSize: '0.9rem',
                                    padding: '0.5rem 1rem'
                                }}
                            >
                                Ablehnen
                            </button>
                            <button
                                onClick={handleAccept}
                                className="nav-button primary"
                                style={{
                                    fontSize: '0.9rem',
                                    padding: '0.5rem 2rem'
                                }}
                            >
                                Alle Akzeptieren
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
