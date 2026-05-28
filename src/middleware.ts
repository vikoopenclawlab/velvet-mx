import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = [
  '/api/health',
  '/api/contact',
]

export function middleware(request: NextRequest) {
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
  // 2. Admin Route Protection
  // ============================================
  
  if (pathname.startsWith('/admin')) {
    // In production, uncomment and use real session:
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.redirect(new URL('/login?callbackUrl=' + encodeURIComponent(request.url), request.url))
    // }
    // if (session.user.role !== 'ADMIN') {
    //   return NextResponse.redirect(new URL('/', request.url))
    // }
    
    // For MVP: check a simple admin cookie or header
    // TODO: Replace with real session check before production
    const isAdmin = request.cookies.get('admin_session')?.value === 'true'
    // For now, allow all admin routes (MVP mode)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}