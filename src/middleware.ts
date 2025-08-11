import { type NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
	const { url, cookies } = request

	const session: string | undefined = cookies.get('session')?.value

	const isAuthPage: boolean = url.includes('/auth')

	console.log('session: ', session)

	if (isAuthPage) {
		if (session) {
			return NextResponse.redirect(new URL('/dashboard/settings', url))
		}

		return NextResponse.next()
	}

	if (!session) {
		return NextResponse.redirect(new URL('/auth/login', url))
	}
}

export const config = {
	matcher: ['/auth/:path*', '/dashboard/:path*']
}
