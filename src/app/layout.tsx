import type { Metadata } from 'next'

import { SidebarTrigger, ToggleTheme } from '@/shared/components/ui'
import { MainProvider } from '@/shared/providers'
import '@/shared/styles/globals.css'

import { SITE_NAME } from '@/constants/seo.constants'
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description:
		'Pet project with full powered from init to deploy by Nick "WXZVRD" Persiya fullstack'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<MainProvider>
					<div className='flex h-screen w-full flex-col overflow-hidden'>
						<ToggleTheme />
						<SidebarTrigger />
						<div className='flex h-screen w-full flex-col overflow-y-auto px-4 py-6'>
							{children}
						</div>
					</div>
				</MainProvider>
			</body>
		</html>
	)
}
