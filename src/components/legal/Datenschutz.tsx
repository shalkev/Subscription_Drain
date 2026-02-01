import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Datenschutz() {
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

    const h2Style: React.CSSProperties = {
        fontSize: '1.5rem',
        fontWeight: '600',
        marginTop: '2rem',
        marginBottom: '1rem',
        color: 'white',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.5rem'
    };

    const h3Style: React.CSSProperties = {
        fontSize: '1.2rem',
        fontWeight: '600',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        color: 'white'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={containerStyle}
        >
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>Datenschutzerklärung</h1>

            <div style={{ fontSize: '0.95rem' }}>
                <h2 style={h2Style}>1. Datenschutz auf einen Blick</h2>

                <h3 style={h3Style}>Allgemeine Hinweise</h3>
                <p>
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung.
                </p>

                <h3 style={h3Style}>Datenerfassung auf dieser Website</h3>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>
                        <strong>Berechnungsdaten (Lokal):</strong><br />
                        Die Daten, die Sie in den Abo-Rechner oder Investment-Rechner eingeben, werden ausschließlich lokal in Ihrem Browser verarbeitet (Local Storage). Es findet keine Speicherung dieser sensiblen Eingaben auf unseren Servern statt.
                    </li>
                    <li>
                        <strong>Server-Log-Files (Hosting):</strong><br />
                        Diese Webseite wird über Vercel gehostet. Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                        <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>Browsertyp und Browserversion</li>
                            <li>Verwendetes Betriebssystem</li>
                            <li>Referrer URL</li>
                            <li>Hostname des zugreifenden Rechners</li>
                            <li>Uhrzeit der Serveranfrage</li>
                            <li>IP-Adresse</li>
                        </ul>
                        Diese Daten sind nicht bestimmten Personen zuordbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am fehlerfreien Betrieb der Website).
                    </li>
                </ul>

                <h2 style={h2Style}>2. Einsatz von Künstlicher Intelligenz (KI)</h2>
                <p>
                    Zur Analyse Ihrer Abonnement-Struktur und Identifikation von Einsparpotenzialen setzen wir modernste Algorithmen und Künstliche Intelligenz (KI) ein.
                    Diese Technologien helfen dabei, Muster in Ihren Ausgaben zu erkennen und personalisierte Empfehlungen zu generieren.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    <strong>Hinweis:</strong> Die KI-Verarbeitung erfolgt bei der Nutzung des Rechners clientseitig (in Ihrem Browser) oder auf sicheren Systemen unter Einhaltung aller Datenschutzstandards. Ihre sensiblen Finanzdaten werden nicht zum Trainieren öffentlicher KI-Modelle verwendet.
                </p>

                <h2 style={h2Style}>3. Cookies</h2>
                <p>
                    Diese Webseite verwendet aktuell keine Cookies, die eine Einwilligung erfordern (kein Tracking, kein Marketing).
                    Sollten technisch notwendige Cookies oder Speichertechnologien (z. B. Local Storage für Ihre Eingaben oder Cookies durch den Hoster Vercel zur Sicherheitsprüfung) eingesetzt werden, erfolgt dies auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                </p>

                <h2 style={h2Style}>4. Hosting mit Vercel</h2>
                <p>
                    Wir hosten unsere Website bei Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA 91789, USA.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    Da Vercel ein US-Unternehmen ist, kann eine Datenübermittlung in die USA stattfinden. Wir nutzen Vercel ausschließlich für die Bereitstellung der technischen Infrastruktur.
                    Weitere Details entnehmen Sie der Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>https://vercel.com/legal/privacy-policy</a>.
                </p>

                <h2 style={h2Style}>5. Hinweis zur verantwortlichen Stelle</h2>
                <p>
                    Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    Privatprojekt - Administrator<br />
                    Kontakt über interne Kanäle.
                </p>

                <h2 style={h2Style}>6. Ihre Rechte (Betroffenenrechte)</h2>
                <p>Sie haben jederzeit das Recht:</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                    <li>Auskunft über Ihre gespeicherten Daten zu erhalten.</li>
                    <li>Die Berichtigung oder Löschung Ihrer Daten zu verlangen.</li>
                    <li>Die Einschränkung der Verarbeitung zu fordern.</li>
                    <li>Widerspruch gegen die Verarbeitung einzulegen.</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                    Bitte wenden Sie sich hierzu an die im Impressum angegebene E-Mail-Adresse.
                </p>
            </div>

            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    ← Zurück zum Rechner
                </Link>
            </div>
        </motion.div>
    );
}
