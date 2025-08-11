import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { useAuth } from '@/feautures/auth/hooks/useAuth'
import { TypeLoginScheme } from '@/feautures/auth/schemes'
import { authService } from '@/feautures/auth/services'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useLoginMutation(
	setIsShowTwoFactor: Dispatch<SetStateAction<boolean>>
) {
	const router = useRouter()
	const { setUser } = useAuth()

	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['login-user'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeLoginScheme
			recaptcha: string
		}) => authService.login(values, recaptcha),
		onSuccess(data) {
			console.log(data)
			console.log(data.message)
			if (data.message) {
				console.log(setIsShowTwoFactor(prevState => prevState))
				toastMessageHandler(data)
				setIsShowTwoFactor(true)
			} else {
				setUser(data)
				toast.success('Успешный вход!')
				router.push('/dashboard/settings')
			}
		},
		onError(error: Error) {
			toastMessageHandler(error)
		}
	})

	return { login, isLoadingLogin }
}
