import { toastMessageHandler } from '@/shared/utils'

import { registerAuth } from '@/feautures/auth/api'
import { TypeRegisterScheme } from '@/feautures/auth/schemes'
import { useMutation } from '@tanstack/react-query'

export function useRegisterMutation(onSuccessRedirect?: () => void) {
	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationKey: ['register-user'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeRegisterScheme
			recaptcha: string
		}) => registerAuth(values, recaptcha),
		onSuccess(data): void {
			toastMessageHandler(data.data)
			onSuccessRedirect?.()
		},
		onError(error: Error): void {
			toastMessageHandler(error)
		}
	})

	return { register, isLoadingRegister }
}
