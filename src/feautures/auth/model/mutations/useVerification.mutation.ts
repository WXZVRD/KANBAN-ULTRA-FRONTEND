import { toast } from 'sonner'

import { APP_ROUTES } from '@/shared/consts/routes'

import { newVerification } from '@/feautures/auth'
import { useMutation } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

export function useVerificationMutation() {
	const router: AppRouterInstance = useRouter()

	const { mutate: verification } = useMutation({
		mutationKey: ['new-verification'],
		mutationFn: (token: string | null) => newVerification(token),
		onSuccess: (): void => {
			toast.success('Почта успешно подтверждена.')
			router.push(APP_ROUTES.DASHBOARD_SETTINGS)
		},
		onError: (): void => {
			router.push(APP_ROUTES.AUTH.LOGIN)
		}
	})

	return { verification }
}
