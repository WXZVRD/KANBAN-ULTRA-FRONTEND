import { toast } from 'sonner'

import { APP_ROUTES } from '@/shared/consts/routes'
import { toastMessageHandler } from '@/shared/utils'

import { newPassword } from '@/feautures/auth/api'
import { TypeNewPasswordScheme } from '@/feautures/auth/schemes'
import { useMutation } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'

export function useNewPasswordMutation() {
	const searchParams: ReadonlyURLSearchParams = useSearchParams()
	const router: AppRouterInstance = useRouter()
	const token: string | null = searchParams.get('token')
	const { mutate: newPasswordMutation, isPending: isNewLoading } =
		useMutation({
			mutationKey: ['new-password'],
			mutationFn: ({
				values,
				recaptcha
			}: {
				values: TypeNewPasswordScheme
				recaptcha: string
			}) => newPassword(values, token, recaptcha),
			onSuccess(): void {
				toast.success('Пароль успешно изменён', {
					description: 'Теперь вы можете войти в свой аккаунт.'
				})
				router.push(APP_ROUTES.DASHBOARD_SETTINGS)
			},
			onError(error: Error): void {
				toastMessageHandler(error)
			}
		})

	return { newPasswordMutation, isNewLoading }
}
