import axios from 'axios'
import { toast } from 'sonner'

export function toastMessageHandler(error: Error) {
	if (error.message) {
		let errorMessage: string

		if (axios.isAxiosError(error) && error.response) {
			errorMessage = error.response.data.message
		} else {
			errorMessage = error.message
		}

		const firstDotIndex: number = errorMessage.indexOf('.')

		if (firstDotIndex !== -1) {
			const title = errorMessage.slice(0, firstDotIndex)
			const description = errorMessage.slice(firstDotIndex + 1)
			toast.error(title, {
				description
			})
		} else {
			toast.error(errorMessage)
		}
	} else {
		toast.error('Ошибка со стороны сервера')
	}
}
