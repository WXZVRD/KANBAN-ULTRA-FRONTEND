import { useEffect } from 'react'





type KeyHandler = (event: KeyboardEvent) => void

export function useKeyPress(key: string, handler: KeyHandler) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === key) {
				handler(event)
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [key, handler])
}
