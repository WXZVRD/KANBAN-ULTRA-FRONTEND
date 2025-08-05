'use client'

import { JSX, type PropsWithChildren } from 'react'

import { TanstackQueryProvider } from '@/shared/providers/TanstackQuery.provider'

export function MainProvider({ children }: PropsWithChildren): JSX.Element {
	return <TanstackQueryProvider>{children}</TanstackQueryProvider>
}
