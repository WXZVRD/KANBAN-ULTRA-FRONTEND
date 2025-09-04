import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'

import { SidebarTrigger, ToggleTheme } from '@/shared/components/ui'
import { SITE_NAME } from '@/shared/consts'
import { MainProvider } from '@/shared/providers'
import '@/shared/styles/globals.css'

import { LocaleSwitcher } from '@/feautures/locale'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

// Fonts
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Pet project with full powered from init to deploy'
}

export default async function RootLayout({
	children,
	params: { locale }
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	let messages
	try {
		messages = (
			await import(`../../shared/locales/messages/${locale}.json`)
		).default
	} catch {
		notFound()
	}

	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<MainProvider>
						<div className='flex h-screen max-h-screen w-full flex-col overflow-hidden'>
							<ToggleTheme />
							<LocaleSwitcher />
							<SidebarTrigger />
							<div className='flex h-screen w-full flex-col overflow-y-auto px-4 py-6'>
								{children}
							</div>
						</div>
					</MainProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
