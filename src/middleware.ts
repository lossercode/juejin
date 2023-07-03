import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * @description: next13路由拦截器, 先检查是否携带token，注意，这个是在服务端运行的
 * @param {NextRequest} request
 * @return {*}
 * @Date: 2023-06-30 13:36:17
 */
export function middleware(request: NextRequest) {
  const headers = request.headers
  console.log(request.url)
  // if(!headers.get('Authorization') || headers.get('Authorization') === ''){
  //   const url = new URL(`/login?from=${request.url}`, request.url)
  //   return NextResponse.redirect(url)
  // }
  return
}

export const config = {
    matcher: ['/user/:path*', ]
}