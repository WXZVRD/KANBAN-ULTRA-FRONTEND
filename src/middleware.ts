import { type NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
	const { url, cookies } = request

	console.log('📩 [Middleware] Новый запрос:', {
		url,
		cookies: cookies.getAll().map(c => ({ name: c.name, value: c.value }))
	})

	const session: string | undefined = cookies.get('session')?.value
	console.log('🔑 [Middleware] Значение session:', session)

	const isAuthPage: boolean = url.includes('/auth')
	console.log('📍 [Middleware] Это страница авторизации?', isAuthPage)

	if (isAuthPage) {
		if (session) {
			console.log(
				'✅ [Middleware] Пользователь авторизован, редирект на /dashboard/settings'
			)
			return NextResponse.redirect(new URL('/dashboard/settings', url))
		}

		console.log(
			'ℹ️ [Middleware] Пользователь не авторизован, пропускаем на страницу /auth/*'
		)
		return NextResponse.next()
	}

	if (!session) {
		console.log('🚫 [Middleware] Нет session, редиректим на /auth/login')
		return NextResponse.redirect(new URL('/auth/login', url))
	}

	console.log(
		'✅ [Middleware] Доступ разрешён для авторизованного пользователя'
	)
	return NextResponse.next()
}

export const config = {
	matcher: ['/auth/:path*', '/dashboard/:path*']
}
