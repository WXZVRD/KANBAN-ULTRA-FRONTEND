import { useCallback, useState } from 'react'

import { useKeyPress } from '@/shared/hooks'

interface UseInputWithControlsOptions {
	initialValue?: string
	onSave: (value: string) => void
	onCancel?: () => void
	autoFocus?: boolean
}

export function useInputWithControls({
	initialValue = '',
	onSave,
	onCancel
}: UseInputWithControlsOptions) {
	const [value, setValue] = useState(initialValue)
	const [isEditing, setIsEditing] = useState(false)

	const handleSave = useCallback(() => {
		if (value.trim()) {
			onSave(value.trim())
			setValue('')
		}
		setIsEditing(false)
	}, [value, onSave])

	const handleCancel = useCallback(() => {
		setValue('')
		setIsEditing(false)
		onCancel?.()
	}, [onCancel])

	useKeyPress('Escape', handleCancel)

	useKeyPress('Enter', e => {
		if (isEditing && value.trim()) {
			e.preventDefault()
			handleSave()
		}
	})

	const startEditing = useCallback(() => {
		setIsEditing(true)
	}, [])

	return {
		value,
		setValue,
		isEditing,
		startEditing,
		handleSave,
		handleCancel
	}
}
