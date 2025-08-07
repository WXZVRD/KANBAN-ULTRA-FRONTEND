import { toast } from 'sonner'

import { verificationService } from '@/feautures/auth/services'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useVerificationMutation() {
	const router = useRouter()

	const { mutate: verification } = useMutation({
		mutationKey: ['new-verification'],
		mutationFn: (token: string | null) =>
			verificationService.newVerification(token),
		onSuccess: () => {
			toast.success('Почта успешно подтверждена.')
			router.push('/dashboard/settings')
		},
		onError: () => {
			router.push('/auth/login')
		}
	})

	return { verification }
}
