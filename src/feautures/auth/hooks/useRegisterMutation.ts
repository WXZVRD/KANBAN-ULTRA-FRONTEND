import { APP_ROUTES } from '@/shared/config/routes'
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
			router.push(APP_ROUTES.AUTH.LOGIN)
		},
		onError(error: Error) {
			toastMessageHandler(error)
		}
	})

	return { register, isLoadingRegister }
}
