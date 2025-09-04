import { toast } from 'sonner'

import { DeleteResult } from '@/shared/api'
import { toastMessageHandler } from '@/shared/utils'

import { IDeleteMemberDTO } from '@/entities/member/api/dto/delete-member.dto'
import { deleteAllMembers } from '@/entities/member/api/member.api'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteProjectMemberMutation() {
	const queryClient: QueryClient = useQueryClient()

	const { mutate: deleteMembers } = useMutation({
		mutationKey: ['delete-members'],
		mutationFn: async (data: IDeleteMemberDTO): Promise<DeleteResult> =>
			await deleteAllMembers(data),
		onSuccess(): void {
			toast.success('Успешное удаление')
			queryClient.invalidateQueries(['project-members'])
		},
		onError(error: Error): void {
			toastMessageHandler(error)
		}
	})

	return { deleteMembers }
}
