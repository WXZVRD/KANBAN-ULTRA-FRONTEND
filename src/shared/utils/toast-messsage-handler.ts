import axios from 'axios'
import { toast } from 'sonner'

export function toastMessageHandler(error: Error) {
	console.log('🔥 Ошибка передана в обработчик:', error)

	if (error.message) {
		let errorMessage: string

		if (axios.isAxiosError(error) && error.response) {
			errorMessage = error.response.data.message
		} else {
			errorMessage = error.message
		}

		console.log('📨 errorMessage:', errorMessage)

		const firstDotIndex: number = errorMessage.indexOf('.')
		console.log('🔍 Индекс первой точки:', firstDotIndex)

		if (firstDotIndex !== -1) {
			const title = errorMessage.slice(0, firstDotIndex)
			const description = errorMessage.slice(firstDotIndex + 1)

			console.log('🧩 Заголовок для toast:', title)
			console.log('📝 Описание для toast:', description)

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
