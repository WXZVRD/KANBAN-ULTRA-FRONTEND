import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeResetPasswordScheme } from '@/feautures/auth/schemes/reset-password.scheme'
import { passwordRecoveryService } from '@/feautures/auth/services/password-recovery.service'
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
		}) => passwordRecoveryService.reset(values, recaptcha),
		onSuccess() {
			toast.success('Проверьте почту', {
				description:
					'На вашу почту была отправлена ссылка для подтверждения.'
			})
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { reset, isLoadingReset }
}
