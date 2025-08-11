'use client'

import { JSX, type PropsWithChildren } from 'react'

import {
	AuthProvider,
	TanstackQueryProvider,
	ThemeProvider
} from '@/shared/providers'
import { ToastProvider } from '@/shared/providers/Toast.provider'

export function MainProvider({ children }: PropsWithChildren): JSX.Element {
	return (
		<TanstackQueryProvider>
			<AuthProvider>
				<ThemeProvider attribute='class' defaultTheme='light'>
					<ToastProvider />
					{children}
				</ThemeProvider>
			</AuthProvider>
		</TanstackQueryProvider>
	)
}
