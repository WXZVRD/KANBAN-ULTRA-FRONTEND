'use client'

import { JSX, type PropsWithChildren, useEffect, useRef } from 'react'

import { SidebarProvider } from '@/shared/components/ui'
import { AnimatedBG } from '@/shared/components/ui/AnimatedBG'
import { AuthProvider, TanstackQueryProvider, ThemeProvider } from '@/shared/providers'
import { ToastProvider } from '@/shared/providers/Toast.provider'

import { AppSidebar } from '@/widgets/sidebar/components/AppSidebar'

export function MainProvider({ children }: PropsWithChildren): JSX.Element {
	const renderCount = useRef(0)
	renderCount.current += 1

	console.log(
		`[MainProvider] render #${renderCount.current}, children type:`,
		typeof children
	)

	useEffect(() => {
		console.log('[MainProvider] mounted')

		return () => {
			console.log('[MainProvider] unmounted')
		}
	}, [])

	useEffect(() => {
		console.log('[MainProvider] children updated:', children)
	}, [children])

	return (
		<TanstackQueryProvider>
			<AuthProvider>
				<SidebarProvider defaultOpen={true}>
					<ThemeProvider attribute='class' defaultTheme='dark'>
						<div className='flex min-h-screen w-full'>
							<AppSidebar />
							<div className='flex-1'>
								<ToastProvider />
								<AnimatedBG>{children}</AnimatedBG>
							</div>
						</div>
					</ThemeProvider>
				</SidebarProvider>
			</AuthProvider>
		</TanstackQueryProvider>
	)
}
