'use client'

import { JSX, type PropsWithChildren } from 'react'

import { SidebarProvider } from '@/shared/components/ui'
import { AnimatedBG } from '@/shared/components/ui/AnimatedBG'
import { AuthProvider, TanstackQueryProvider, ThemeProvider } from '@/shared/providers'
import { ModalProvider } from '@/shared/providers/Modal.provider'
import { ToastProvider } from '@/shared/providers/Toast.provider'

import { AppSidebar } from '@/widgets/sidebar/components/AppSidebar'

export function MainProvider({ children }: PropsWithChildren): JSX.Element {
	return (
		<TanstackQueryProvider>
			<AuthProvider>
				<SidebarProvider defaultOpen={true}>
					<ThemeProvider attribute='class' defaultTheme='dark'>
						<ModalProvider>
							<div className='flex min-h-screen w-full'>
								<AppSidebar />
								<div className='flex-1'>
									<ToastProvider />
									<AnimatedBG>{children}</AnimatedBG>
								</div>
							</div>
						</ModalProvider>
					</ThemeProvider>
				</SidebarProvider>
			</AuthProvider>
		</TanstackQueryProvider>
	)
}
