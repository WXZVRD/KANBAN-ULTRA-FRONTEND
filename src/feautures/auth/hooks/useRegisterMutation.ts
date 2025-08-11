import { toastMessageHandler } from '@/shared/utils'

import { TypeRegisterScheme } from '@/feautures/auth/schemes'
import { authService } from '@/feautures/auth/services'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useRegisterMutation() {
	const router = useRouter()

	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationKey: ['register-user'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeRegisterScheme
			recaptcha: string
		}) => authService.register(values, recaptcha),
		onSuccess(data) {
			toastMessageHandler(data.data)
			router.push('/auth/login')
			/*if (data.message) {
				toastMessageHandler(data)
			}*/
			/*toast.success('Успешная регистрация', {
					description:
						'Подтвердите почту. Сообщение было отправлено на ваш почтовый адресс.'
				})*/
		},
		onError(error: Error) {
			toastMessageHandler(error)
		}
	})

	return { register, isLoadingRegister }
}
