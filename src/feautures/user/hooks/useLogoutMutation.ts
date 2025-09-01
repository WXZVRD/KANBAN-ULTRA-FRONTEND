import { toast } from 'sonner'

import { APP_ROUTES } from '@/shared/config/routes'
import { toastMessageHandler } from '@/shared/utils'

import { authService } from '@/feautures/auth/services'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useLogoutMutation() {
	const router = useRouter()

	const { mutate: logout, isPending: isLoadingLogout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			toast.success('Вы успешно вышли из системы')
			router.push(APP_ROUTES.AUTH.LOGIN)
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { logout, isLoadingLogout }
}
