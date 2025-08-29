import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Add any middleware logic here if needed
  return res
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|favicon.ico).*)", // skip static files and _next
    "/", // include root route
    "/(api|trpc)(.*)", // include API and TRPC
  ],
}
