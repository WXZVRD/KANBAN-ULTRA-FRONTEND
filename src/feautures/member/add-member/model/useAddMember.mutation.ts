import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { AddMemberApi, IAddMemberDTO } from '@/feautures/member/add-member/api/addMember.api'
import { useMutation } from '@tanstack/react-query'

export function useAddMember() {
	const { mutate: addMember } = useMutation({
		mutationKey: ['add-member'],
		mutationFn: async (data: IAddMemberDTO) => await AddMemberApi(data),
		onSuccess() {
			toast.success(
				'Пользователю было отправлено письмо с приглашением на почту!'
			)
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { addMember }
}
