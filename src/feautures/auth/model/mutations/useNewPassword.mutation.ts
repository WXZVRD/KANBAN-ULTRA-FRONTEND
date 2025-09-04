'use client'

import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { newPassword, TypeNewPasswordScheme } from '@/feautures/auth'
import { useMutation } from '@tanstack/react-query'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'

export function useNewPasswordMutation(onSuccessRedirect?: () => void) {
	const searchParams: ReadonlyURLSearchParams = useSearchParams()
	const token: string | null = searchParams.get('token')

	const { mutate: newPasswordMutation, isPending: isNewLoading } =
		useMutation({
			mutationKey: ['new-password'],
			mutationFn: ({
				values,
				recaptcha
			}: {
				values: TypeNewPasswordScheme
				recaptcha: string
			}) => newPassword(values, token, recaptcha),
			onSuccess(): void {
				toast.success('Пароль успешно изменён', {
					description: 'Теперь вы можете войти в свой аккаунт.'
				})
				onSuccessRedirect?.()
			},
			onError(error: Error): void {
				toastMessageHandler(error)
			}
		})

	return { newPasswordMutation, isNewLoading }
}
