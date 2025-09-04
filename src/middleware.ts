import { type NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export default function middleware(request: NextRequest) {
	const { nextUrl, cookies } = request
	const session = cookies.get('session')?.value

	const isAuthPage = nextUrl.pathname.startsWith('/auth')

	const locale = cookies.get('NEXT_LOCALE')?.value || 'en'
	const pathname = nextUrl.pathname

	if (!PUBLIC_FILE.test(pathname) && !pathname.startsWith(`/${locale}`)) {
		const url = request.nextUrl.clone()
		url.pathname = `/${locale}${pathname}`
		return NextResponse.redirect(url)
	}

	if (isAuthPage) {
		if (session) {
			return NextResponse.redirect(
				new URL(`/${locale}/dashboard/settings`, request.url)
			)
		}
		return NextResponse.next()
	}

	if (pathname.startsWith(`/${locale}/dashboard`) && !session) {
		return NextResponse.redirect(
			new URL(`/${locale}/auth/login`, request.url)
		)
	}

	if (pathname.startsWith(`/${locale}/project`) && !session) {
		return NextResponse.redirect(
			new URL(`/${locale}/auth/login`, request.url)
		)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!_next|.*\\..*).*)']
}
