'use client'

import { JSX, type PropsWithChildren } from 'react'

import { SidebarProvider, SidebarTrigger } from '@/shared/components/ui'
import { AuthProvider, TanstackQueryProvider, ThemeProvider } from '@/shared/providers'
import { ToastProvider } from '@/shared/providers/Toast.provider'

import { AppSidebar } from '@/widgets/sidebar/components/AppSidebar'

export function MainProvider({ children }: PropsWithChildren): JSX.Element {
	return (
		<TanstackQueryProvider>
			<AuthProvider>
				<SidebarProvider defaultOpen={true}>
					<ThemeProvider attribute='class' defaultTheme='light'>
						<div className='flex min-h-screen w-full overflow-x-hidden'>
							<AppSidebar />
							<div className='flex-1 overflow-x-hidden'>
								<SidebarTrigger />
								<ToastProvider />
								{children}
							</div>
						</div>
					</ThemeProvider>
				</SidebarProvider>
			</AuthProvider>
		</TanstackQueryProvider>
	)
}
