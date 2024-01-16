import { NextResponse } from "next/server";

export function middleware(request) {

    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup" || path === "/forget-password" || path === "/reset-password";

    const userSession = request.cookies.get('next-auth.session-token');

    if (isPublicPath && userSession) {
        return Response.redirect(new URL('/profile', request.url));
    }

    else if (!isPublicPath && !userSession) {
        return Response.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/profile/:path*',
        '/signup',
        '/login',
        '/forget-password',
        '/reset-password'
    ]
};
