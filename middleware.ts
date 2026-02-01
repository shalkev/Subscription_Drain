import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const authHeader = request.headers.get('authorization')

    // Benutzername: myname
    // Passwort: myproject2026
    const expectedAuth = 'Basic ' + btoa('myname:myproject2026')

    if (authHeader !== expectedAuth) {
        return new NextResponse('Nicht autorisiert', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Privates Hobbyprojekt"',
            },
        })
    }

    return NextResponse.next()
}

// Diese Zeile sorgt dafür, dass die Sperre für ALLE Seiten gilt
export const config = {
    matcher: '/:path*',
}
