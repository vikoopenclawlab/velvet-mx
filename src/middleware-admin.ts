import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Route protection middleware for admin routes
// In production, this would use the actual session and role check

export async function middleware(request: NextRequest) {
  // Only protect admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // In production, check session:
  // const session = await getServerSession(authOptions)
  // if (!session?.user) {
  //   return NextResponse.redirect(new URL('/login?callbackUrl=' + encodeURIComponent(request.url), request.url))
  // }
  // if (session.user.role !== 'ADMIN') {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  // For MVP, allow all admin routes with a warning header
  // TODO: Enable actual session check before production

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}