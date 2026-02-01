import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Impressum() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="legal-container"
        >
            <h1>Impressum</h1>

            <div className="legal-section">
                <h2>Angaben gemäß § 5 DDG</h2>
                <p>
                    Privatprojekt<br />
                    Keine öffentliche Zugänglichkeit ohne Autorisierung.
                </p>
            </div>

            <div className="legal-section">
                <h2>Kontakt</h2>
                <p>
                    Kontakt über Projekt-Administrator.
                </p>
            </div>

            <div className="legal-section">
                <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                <p>
                    Privatprojekt - Administrator
                </p>
            </div>

            <div className="legal-section">
                <h2>Wichtiger Haftungsausschluss (Finanz-Disclaimer)</h2>
                <h3>Keine Anlageberatung</h3>
                <p>
                    Die auf dieser Webseite angebotenen Tools (Abo-Analyse, Investment-Rechner) dienen ausschließlich Informations- und Unterhaltungszwecken. Die Ergebnisse stellen keine Anlageberatung und keine Aufforderung zum Kauf oder Verkauf von Finanzinstrumenten dar.
                </p>
                <h3>Risikohinweis & KI-Nutzung</h3>
                <p>
                    Die Berechnungen basieren auf Annahmen oder historischen Werten. Wertentwicklungen der Vergangenheit sind kein Indikator für die Zukunft. Jedes Investment ist mit Risiken bis hin zum Totalverlust verbunden.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    <strong>KI-Hinweis:</strong> Die App nutzt modernste Algorithmen und Künstliche Intelligenz (AI), um Sparpotenziale zu ermitteln. Die Ergebnisse sind theoretische Hochrechnungen. Der Betreiber haftet nicht für Entscheidungen, die auf Basis dieser automatisierten Analysen getroffen werden.
                </p>
            </div>

            <div className="legal-section">
                <h2>Urheberrecht & Externe Links</h2>
                <p>
                    Die Inhalte dieser Seite sind urheberrechtlich geschützt. Die Nutzung von Logos (z. B. Streaming-Anbieter) erfolgt nur zur Identifikation der Dienste im Rahmen der Abo-Analyse. Wir machen uns die Inhalte verlinkter externer Webseiten nicht zu eigen und übernehmen keine Haftung für deren Inhalte.
                </p>
            </div>

            <div className="legal-section">
                <h2>EU-Streitschlichtung</h2>
                <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                    <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', marginLeft: '5px' }}>
                        https://ec.europa.eu/consumers/odr/
                    </a>.<br />
                    Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
            </div>

            <div className="legal-section">
                <h2>Verbraucherstreitbeilegung</h2>
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
