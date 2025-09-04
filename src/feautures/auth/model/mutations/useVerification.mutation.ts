import { toast } from 'sonner'

import { newVerification } from '@/feautures/auth'
import { useMutation } from '@tanstack/react-query'

export function useVerificationMutation(
	onErrorRedirect?: () => void,
	onSuccessRedirect?: () => void
) {
	const { mutate: verification } = useMutation({
		mutationKey: ['new-verification'],
		mutationFn: (token: string | null) => newVerification(token),
		onSuccess: (): void => {
			toast.success('Почта успешно подтверждена.')

			onSuccessRedirect?.()
		},
		onError: (): void => {
			onErrorRedirect?.()
		}
	})

	return { verification }
}
