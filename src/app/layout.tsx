import type { Metadata } from 'next'

import { ToggleTheme } from '@/shared/components/ui'
import { MainProvider } from '@/shared/providers'
import '@/shared/styles/globals.css'

import { SideBarWrapper } from '@/widgets/sidebar/components'
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
		absolute: 'WXZVRD KANBAN ULTRA',
		template: '%s | WXZVRD KANBAN ULTRA'
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
					<div className='relative flex min-h-screen'>
						<ToggleTheme />
						<SideBarWrapper />
						<div className='item-center flex h-screen w-full w-screen flex-col items-center justify-center'>
							{children}
						</div>
					</div>
				</MainProvider>
			</body>
		</html>
	)
}
