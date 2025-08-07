'use client'

import { JSX, type PropsWithChildren } from 'react'

import { TanstackQueryProvider, ThemeProvider } from '@/shared/providers'
import { ToastProvider } from '@/shared/providers/Toast.provider'

export function MainProvider({ children }: PropsWithChildren): JSX.Element {
	return (
		<TanstackQueryProvider>
			<ThemeProvider attribute='class' defaultTheme='light'>
				<ToastProvider />
				{children}
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}
