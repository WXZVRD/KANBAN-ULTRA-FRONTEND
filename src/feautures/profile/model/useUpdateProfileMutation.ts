import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { updateProfile } from '@/feautures/profile/api/profile.api'
import { TypeSettingsScheme } from '@/feautures/user/schemes'
import { useMutation } from '@tanstack/react-query'

export function useUpdateProfileMutation() {
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update-profile'],
		mutationFn: (data: TypeSettingsScheme) => updateProfile(data),
		onSuccess(): void {
			toast.success('Профиль успешно обновлён')
		},
		onError(error: Error): void {
			toastMessageHandler(error)
		}
	})

	return { update, isLoadingUpdate }
}
