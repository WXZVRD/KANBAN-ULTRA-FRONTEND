import { toast } from 'sonner'

export function toastMessageHandler(error: Error) {
	console.log('🔥 Ошибка передана в обработчик:', error)

	if (error.message) {
		const errorMessage: string = error.message
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
			console.log(
				'⚠️ Нет точки в сообщении, выводим полное сообщение как заголовок:'
			)
			toast.error(errorMessage)
		}
	} else {
		console.log(
			'🚨 error.message отсутствует, выводим сообщение по умолчанию'
		)
		toast.error('Ошибка со стороны сервера')
	}
}
