export default function middleware(request: Request) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || '';

    // Erlaube Social Media Bots den Zugriff für Link-Vorschauen
    const isBot = /bot|facebookexternalhit|whatsapp|telegram|twitter|slack|linkedin|discord|googlebot|bingbot/i.test(userAgent);

    // Erlaube direkten Zugriff auf das Vorschaubild (auch mit Query-Parametern)
    const isOgImage = url.pathname === '/og-preview.png' || url.pathname.endsWith('og-preview.png');

    if (isBot || isOgImage) {
        return new Response(null, {
            headers: { 'x-middleware-next': '1' },
        });
    }

    const authHeader = request.headers.get('authorization')

    // Benutzername: myname
    // Passwort: myproject2026
    const expectedAuth = 'Basic ' + btoa('myname:myproject2026')

    if (authHeader !== expectedAuth) {
        return new Response('Nicht autorisiert', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Privates Hobbyprojekt"',
            },
        })
    }

    return new Response(null, {
        headers: {
            'x-middleware-next': '1',
        },
    })
}

// Diese Zeile sorgt dafür, dass die Sperre für ALLE Seiten gilt
export const config = {
    matcher: '/:path*',
}