import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeSettingsScheme } from '@/feautures/user/schemes'
import { userService } from '@/feautures/user/services'
import { useMutation } from '@tanstack/react-query'

export function useUpdateProfileMutation() {
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update-profile'],
		mutationFn: (data: TypeSettingsScheme) =>
			userService.updateProfile(data),
		onSuccess() {
			toast.success('Профиль успешно обновлён')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { update, isLoadingUpdate }
}
