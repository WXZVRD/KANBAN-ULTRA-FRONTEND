import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { APP_ROUTES } from '@/shared/consts/routes'
import { toastMessageHandler } from '@/shared/utils'

import { loginAuth } from '@/feautures/auth/api'
import { TypeLoginScheme } from '@/feautures/auth/schemes'
import { useMutation } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

export function useLoginMutation(
	setIsShowTwoFactor: Dispatch<SetStateAction<boolean>>
) {
	const router: AppRouterInstance = useRouter()

	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['login-user'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeLoginScheme
			recaptcha: string
		}) => loginAuth(values, recaptcha),
		onSuccess(data): void {
			if (data.message) {
				toastMessageHandler(data)
				setIsShowTwoFactor(true)
			} else {
				toast.success('Успешный вход!')
				router.push(APP_ROUTES.DASHBOARD_SETTINGS)
			}
		},
		onError(error: Error): void {
			toastMessageHandler(error)
		}
	})

	return { login, isLoadingLogin }
}
