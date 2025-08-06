'use client'

import { JSX, type PropsWithChildren } from 'react'

import { TanstackQueryProvider, ThemeProvider } from '@/shared/providers'

export function MainProvider({ children }: PropsWithChildren): JSX.Element {
	return (
		<TanstackQueryProvider>
			<ThemeProvider attribute='class' defaultTheme='light'>
				{children}
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}
