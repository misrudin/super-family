import { verifyToken } from '@/utils/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { keyToken } from './helpers/credentials';

const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/family',
    '/transactions',
    '/categories',
    '/settings'
];

const protectedApiRoutes = [
    '/api/account'
];

const guestOnlyRoutes = [
    '/login',
    '/register'
];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = getTokenFromRequest(request);

    // Cek apakah ini adalah API route
    const isApiRoute = pathname.startsWith('/api/');

    // Cek apakah route memerlukan autentikasi
    const isProtectedRoute = isApiRoute
        ? protectedApiRoutes.some(route => pathname.startsWith(route))
        : protectedRoutes.some(route => pathname.startsWith(route));

    const isGuestOnlyRoute = guestOnlyRoutes.some(route => pathname.startsWith(route));

    // Jika user sudah login dan mengakses guest-only route (login/register), redirect ke dashboard
    if (!!token && isGuestOnlyRoute && !isApiRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Jika bukan protected route, lanjutkan
    if (!isProtectedRoute) {
        return NextResponse.next();
    }

    if (!token) {
        if (isApiRoute) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Token tidak ditemukan',
                    error: 'Unauthorized'
                },
                { status: 401 }
            );
        } else {
            // Redirect ke login untuk halaman web
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Verifikasi token
    const payload = verifyToken(token);

    if (!payload) {
        if (isApiRoute) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Token tidak valid',
                    error: 'Unauthorized'
                },
                { status: 401 }
            );
        } else {
            // Redirect ke login untuk halaman web
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Token valid, tambahkan user info ke headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-email', payload.email);
    requestHeaders.set('x-user-role', payload.role);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

function getTokenFromRequest(request: NextRequest): string | null {
    // Cek Authorization header
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    // Cek cookie (fallback)
    const tokenCookie = request.cookies.get(keyToken);
    if (tokenCookie) {
        return tokenCookie.value;
    }

    return null;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
};
