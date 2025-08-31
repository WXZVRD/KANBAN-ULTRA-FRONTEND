import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { deleteMemberApi, IDeleteMemberDTO } from '@/feautures/member/delete-member/api/deleteMember.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteProjectMemberMutation() {
	const queryClient = useQueryClient()

	const { mutate: deleteMembers } = useMutation({
		mutationKey: ['delete-members'],
		mutationFn: async (data: IDeleteMemberDTO) =>
			await deleteMemberApi(data),
		onSuccess() {
			toast.success('Успешное удаление')
			queryClient.invalidateQueries(['project-members'])
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { deleteMembers }
}
