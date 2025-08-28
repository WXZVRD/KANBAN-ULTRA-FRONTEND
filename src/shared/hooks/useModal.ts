import { useContext } from 'react'

import { ModalContext } from '@/shared/providers/Modal.provider'

export const useModal = () => {
	const ctx = useContext(ModalContext)
	if (!ctx) throw new Error('useModal must be used inside ModalProvider')
	return ctx
}
