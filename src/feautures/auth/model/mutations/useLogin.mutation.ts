import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import { toastMessageHandler } from '@/shared/utils'

import { loginAuth, TypeLoginScheme } from '@/feautures/auth'
import { useMutation } from '@tanstack/react-query'

export function useLoginMutation(
	setIsShowTwoFactor: Dispatch<SetStateAction<boolean>>,
	onSuccessRedirect?: () => void
) {
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
				onSuccessRedirect?.()
			}
		},
		onError(error: Error): void {
			toastMessageHandler(error)
		}
	})

	return { login, isLoadingLogin }
}
