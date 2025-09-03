import { toast } from 'sonner'

import { APP_ROUTES } from '@/shared/consts/routes'
import { toastMessageHandler } from '@/shared/utils'

import { logoutAuth } from '@/feautures/auth/api'
import { useMutation } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

export function useLogoutMutation() {
	const router: AppRouterInstance = useRouter()

	const { mutate: logout, isPending: isLoadingLogout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => logoutAuth(),
		onSuccess(): void {
			toast.success('Вы успешно вышли из системы')
			router.push(APP_ROUTES.AUTH.LOGIN)
		},
		onError(error: Error): void {
			toastMessageHandler(error)
		}
	})

	return { logout, isLoadingLogout }
}
