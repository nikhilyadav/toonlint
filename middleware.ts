import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // List of valid routes
  const validRoutes = [
    '/',
    '/toon',
    '/features', 
    '/api',
    '/contact',
  ];
  
  // Check if the path is a valid route
  const isValidRoute = validRoutes.includes(pathname) || 
                      pathname.startsWith('/_next') || 
                      pathname.startsWith('/api') ||
                      pathname.includes('.');
  
  // If not valid route and doesn't contain file extensions, redirect to 404
  if (!isValidRoute && !pathname.includes('.')) {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
