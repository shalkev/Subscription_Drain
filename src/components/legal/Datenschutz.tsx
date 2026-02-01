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
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>

                <h3 style={h3Style}>Datenerfassung auf dieser Website</h3>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</li>
                    <li><strong>Wie erfassen wir Ihre Daten?</strong><br />Diese Anwendung arbeitet als Client-Side-Applikation. Das bedeutet, dass die von Ihnen eingegebenen Daten zu Ihren Abonnements und Kosten ausschließlich in Ihrem Browser verarbeitet und gespeichert werden (Local Storage). Es erfolgt keine Übertragung dieser sensiblen Eingabedaten an unsere Server oder Dritte.<br />Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme (bzw. den Hosting-Provider Vercel) erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</li>
                    <li><strong>Wofür nutzen wir Ihre Daten?</strong><br />Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Die Eingabedaten dienen ausschließlich der Durchführung der von Ihnen gewünschten Berechnungen.</li>
                </ul>

                <h2 style={h2Style}>2. Hosting</h2>
                <h3 style={h3Style}>Hosting mit Vercel</h3>
                <p>
                    Wir hosten unsere Website bei Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA 91789, USA.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adressen. Vercel verwendet diese Daten, um die technische Infrastruktur bereitzustellen und die Sicherheit der Website zu gewährleisten.
                    Details entnehmen Sie der Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>https://vercel.com/legal/privacy-policy</a>.
                </p>

                <h2 style={h2Style}>3. Allgemeine Hinweise und Pflichtinformationen</h2>
                <h3 style={h3Style}>Datenschutz</h3>
                <p>
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>

                <h3 style={h3Style}>Hinweis zur verantwortlichen Stelle</h3>
                <p>
                    Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    Volha Shalkevich<br />
                    Gehrenbachweg 30<br />
                    72275 Alpirsbach<br />
                    E-Mail: volh.shalk@gmail.com
                </p>

                <h3 style={h3Style}>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                <p>
                    Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
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
