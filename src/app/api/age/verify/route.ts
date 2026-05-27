import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const redirectTo = new URL(request.url).searchParams.get('redirect') || '/'

  const response = NextResponse.redirect(new URL(redirectTo, request.url))

  // Set age verification cookie (max age 1 year)
  response.cookies.set('age_verified', 'true', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false, // Allow JS access for analytics
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}