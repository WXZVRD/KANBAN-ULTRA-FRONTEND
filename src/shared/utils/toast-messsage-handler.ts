import { toast } from 'sonner'

export function toastMessageHandler(error: Error) {
	if (error.message) {
		const errorMessage: string = error.message
		const firstDotIndex: number = errorMessage.indexOf('.')

		if (firstDotIndex !== -1) {
			toast.error(errorMessage.slice(0, firstDotIndex), {
				description: errorMessage.slice(firstDotIndex + 1)
			})
		} else {
			toast.error(errorMessage)
		}
	} else {
		toast.error('Ошибка со строки сервера')
	}
}
