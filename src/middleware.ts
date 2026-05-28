import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = [
  '/api/health',
  '/api/contact',
]

// Decode JWT payload from next-auth session token (no verification in Edge runtime)
// For production, use jose with proper secret verification in Node.js runtime routes
function decodeJWT(token: string): any | null {
  try {
    // JWT format: header.payload.signature
    const parts = token.split('.')
    if (parts.length !== 3) return null
    // Decode base64url payload
    const payload = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/')
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4)
    const decoded = Buffer.from(padded, 'base64').toString('utf-8')
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ============================================
  // 1. Age Verification (all users)
  // ============================================
  
  // Allow public API paths
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Check for age verification cookie
  const ageVerified = request.cookies.get('age_verified')?.value === 'true'

  // Paths that don't need age verification
  const excludedPaths = ['/age-gate', '/login', '/register', '/_next', '/favicon', '/public']
  const isExcluded = excludedPaths.some(path => pathname.startsWith(path))

  if (isExcluded) {
    return NextResponse.next()
  }

  if (!ageVerified) {
    // Check if it's an API route (allow for health check)
    if (pathname.startsWith('/api/')) {
      return NextResponse.next()
    }
    
    // Redirect to age gate for any page request
    const url = request.nextUrl.clone()
    url.pathname = '/age-gate'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // ============================================
  // 2. Admin Route Protection (AUTH REQUIRED)
  // ============================================
  
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get('next-auth.session-token')?.value
      || request.cookies.get('__Secure-next-auth.session-token')?.value

    if (!sessionToken) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }

    const payload = decodeJWT(sessionToken)

    if (!payload) {
      const response = NextResponse.redirect(new URL('/login?error=SessionExpired', request.url))
      response.cookies.delete('next-auth.session-token')
      response.cookies.delete('__Secure-next-auth.session-token')
      return response
    }

    // Check role is ADMIN
    const role = payload.role || (payload as any)?.user?.role
    if (role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}