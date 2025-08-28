'use client'

import { ReactNode, createContext, useState } from 'react'

type ModalType = 'login' | 'editProfile' | null

interface ModalContextValue {
	open: (type: ModalType, props?: any) => void
	close: () => void
	type: ModalType
	props: any
}

export const ModalContext = createContext<ModalContextValue | null>(null)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [type, setType] = useState<ModalType>(null)
	const [props, setProps] = useState<any>(null)

	const open = (t: ModalType, p?: any) => {
		setType(t)
		setProps(p || {})
	}

	const close = () => {
		setType(null)
		setProps(null)
	}

	return (
		<ModalContext.Provider value={{ open, close, type, props }}>
			{children}
		</ModalContext.Provider>
	)
}
