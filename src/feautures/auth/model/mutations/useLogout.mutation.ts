import { toast } from 'sonner'
import { toastMessageHandler } from '@/shared/utils'

import { logoutAuth } from '@/feautures/auth/api'
import { useMutation } from '@tanstack/react-query'

export function useLogoutMutation(onSuccessRedirect?: () => void) {
	const { mutate: logout, isPending: isLoadingLogout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => logoutAuth(),
		onSuccess(): void {
			toast.success('Вы успешно вышли из системы')
			onSuccessRedirect?.()
		},
		onError(error: Error): void {
			toastMessageHandler(error)
		}
	})

	return { logout, isLoadingLogout }
}
