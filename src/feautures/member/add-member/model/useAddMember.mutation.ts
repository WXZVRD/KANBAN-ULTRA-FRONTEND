import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { ICreateMemberDTO } from '@/entities/member/api/dto/create-member.api'
import { createMember } from '@/entities/member/api/member.api'
import { useMutation } from '@tanstack/react-query'

export function useAddMember() {
	const { mutate: addMemberMutation } = useMutation({
		mutationKey: ['add-member'],
		mutationFn: async (data: ICreateMemberDTO): Promise<boolean> =>
			await createMember(data),
		onSuccess(): void {
			toast.success(
				'Пользователю было отправлено письмо с приглашением на почту!'
			)
		},
		onError(error: Error): void {
			toastMessageHandler(error)
		}
	})

	return { addMemberMutation }
}
