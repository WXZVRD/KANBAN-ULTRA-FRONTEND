import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { confirmInvite, IConfirmInviteDTO } from '@/feautures/member/add-member/api/confirmInvite.api'
import { useMutation } from '@tanstack/react-query'

export function useConfirmInviteMutation() {
	const { mutate: confirmInvitation } = useMutation({
		mutationKey: ['take-invite'],
		mutationFn: async (data: IConfirmInviteDTO) =>
			await confirmInvite(data),
		onSuccess() {
			toast.success('Вы стали участником нового проекта!')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { confirmInvitation }
}
