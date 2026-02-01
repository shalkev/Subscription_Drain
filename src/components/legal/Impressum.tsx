import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Impressum() {
    const containerStyle: React.CSSProperties = {
        maxWidth: '800px',
        margin: '0 auto 5rem',
        padding: '2rem',
        background: 'var(--bg-card)',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        color: 'var(--text-main)',
        lineHeight: '1.6'
    };

    const sectionStyle: React.CSSProperties = {
        marginBottom: '2rem'
    };

    const h2Style: React.CSSProperties = {
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: 'white',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.5rem'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={containerStyle}
        >
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>Impressum</h1>

            <div style={sectionStyle}>
                <h2 style={h2Style}>Angaben gemäß § 5 TMG</h2>
                <p>
                    Volha Shalkevich<br />
                    Gehrenbachweg 30<br />
                    72275 Alpirsbach
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={h2Style}>Kontakt</h2>
                <p>
                    E-Mail: volh.shalk@gmail.com
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={h2Style}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                <p>
                    Volha Shalkevich<br />
                    Gehrenbachweg 30<br />
                    72275 Alpirsbach
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={h2Style}>EU-Streitschlichtung</h2>
                <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                    <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', marginLeft: '5px' }}>
                        https://ec.europa.eu/consumers/odr/
                    </a>.<br />
                    Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={h2Style}>Verbraucherstreitbeilegung</h2>
                <p>
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
            </div>

            <div style={sectionStyle}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>Haftung für Inhalte</h3>
                <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
            </div>

            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    ← Zurück zum Rechner
                </Link>
            </div>
        </motion.div>
    );
}
