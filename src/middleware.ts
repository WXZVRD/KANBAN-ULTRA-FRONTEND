import { type NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
	const { url, cookies } = request

	const session: string | undefined = cookies.get('session')?.value

	const isAuthPage: boolean = url.includes('/auth')

	if (isAuthPage) {
		if (session) {
			return NextResponse.redirect(new URL('/dashboard/settings', url))
		}

		return NextResponse.next()
	}
}

export const config = {
	matcher: ['/auth/:path*', '/dashboard/:path*']
}
