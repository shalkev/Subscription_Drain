export default function middleware(request: Request) {
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
