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
                <h2 style={h2Style}>Angaben gemäß § 5 DDG</h2>
                <p>
                    Privatprojekt<br />
                    Keine öffentliche Zugänglichkeit ohne Autorisierung.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={h2Style}>Kontakt</h2>
                <p>
                    Kontakt über Projekt-Administrator.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={h2Style}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                <p>
                    Privatprojekt - Administrator
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={h2Style}>Wichtiger Haftungsausschluss (Finanz-Disclaimer)</h2>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>Keine Anlageberatung</h3>
                <p>
                    Die auf dieser Webseite angebotenen Tools (Abo-Analyse, Investment-Rechner) dienen ausschließlich Informations- und Unterhaltungszwecken. Die Ergebnisse stellen keine Anlageberatung und keine Aufforderung zum Kauf oder Verkauf von Finanzinstrumenten dar.
                </p>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', marginTop: '1rem', marginBottom: '0.5rem' }}>Risikohinweis & KI-Nutzung</h3>
                <p>
                    Die Berechnungen basieren auf Annahmen oder historischen Werten. Wertentwicklungen der Vergangenheit sind kein Indikator für die Zukunft. Jedes Investment ist mit Risiken bis hin zum Totalverlust verbunden.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    <strong>KI-Hinweis:</strong> Die App nutzt modernste Algorithmen und Künstliche Intelligenz (AI), um Sparpotenziale zu ermitteln. Die Ergebnisse sind theoretische Hochrechnungen. Der Betreiber haftet nicht für Entscheidungen, die auf Basis dieser automatisierten Analysen getroffen werden.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={h2Style}>Urheberrecht & Externe Links</h2>
                <p>
                    Die Inhalte dieser Seite sind urheberrechtlich geschützt. Die Nutzung von Logos (z. B. Streaming-Anbieter) erfolgt nur zur Identifikation der Dienste im Rahmen der Abo-Analyse. Wir machen uns die Inhalte verlinkter externer Webseiten nicht zu eigen und übernehmen keine Haftung für deren Inhalte.
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

            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                <Link to="/" className="footer-link" style={{ fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    ← Zurück zum Rechner
                </Link>
            </div>
        </motion.div>
    );
}
