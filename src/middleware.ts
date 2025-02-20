import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getOrCreateDB from './models/server/dbSetup'
import getOrCreateStorage from './models/server/storageSetup'





export async function middleware(request: NextRequest) {
    await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    /* match all request path except for the ones that start with 
    - api
    - _next/static
    - _next/image
    - favicon.com
    */
   
  matcher: [
   
    '/((?!api|_next/static|_next/image|favicon\.ico).)*',
  ],
}