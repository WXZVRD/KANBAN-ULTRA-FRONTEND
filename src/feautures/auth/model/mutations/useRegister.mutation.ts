import { APP_ROUTES } from '@/shared/consts/routes'
import { toastMessageHandler } from '@/shared/utils'

import { registerAuth } from '@/feautures/auth/api'
import { TypeRegisterScheme } from '@/feautures/auth/schemes'
import { useMutation } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

export function useRegisterMutation() {
	const router: AppRouterInstance = useRouter()

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
			router.push(APP_ROUTES.AUTH.LOGIN)
		},
		onError(error: Error): void {
			toastMessageHandler(error)
		}
	})

	return { register, isLoadingRegister }
}
