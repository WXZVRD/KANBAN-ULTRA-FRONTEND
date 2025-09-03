import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { resetPassword } from '@/feautures/auth/api'
import { TypeResetPasswordScheme } from '@/feautures/auth/schemes/reset-password.scheme'
import { useMutation } from '@tanstack/react-query'

export function useResetPasswordMutation() {
	const { mutate: reset, isPending: isLoadingReset } = useMutation({
		mutationKey: ['reset-password'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeResetPasswordScheme
			recaptcha: string
		}) => resetPassword(values, recaptcha),
		onSuccess(): void {
			toast.success('Проверьте почту', {
				description:
					'На вашу почту была отправлена ссылка для подтверждения.'
			})
		},
		onError(error: Error): void {
			toastMessageHandler(error)
		}
	})

	return { reset, isLoadingReset }
}
