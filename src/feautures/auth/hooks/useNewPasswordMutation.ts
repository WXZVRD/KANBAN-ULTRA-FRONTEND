import { toast } from 'sonner'

import { APP_ROUTES } from '@/shared/config/routes'
import { toastMessageHandler } from '@/shared/utils'

import { TypeNewPasswordScheme } from '@/feautures/auth/schemes'
import { passwordRecoveryService } from '@/feautures/auth/services'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

export function useNewPasswordMutation() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const token = searchParams.get('token')
	const { mutate: newPassword, isPending: isNewLoading } = useMutation({
		mutationKey: ['new-password'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeNewPasswordScheme
			recaptcha: string
		}) => passwordRecoveryService.new(values, token, recaptcha),
		onSuccess() {
			toast.success('Пароль успешно изменён', {
				description: 'Теперь вы можете войти в свой аккаунт.'
			})
			router.push(APP_ROUTES.DASHBOARD_SETTINGS)
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { newPassword, isNewLoading }
}
