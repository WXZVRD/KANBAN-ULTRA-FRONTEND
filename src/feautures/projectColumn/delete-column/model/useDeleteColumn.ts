import { toast } from 'sonner'

import { DeleteResult } from '@/shared/api'
import { toastMessageHandler } from '@/shared/utils'

import { deleteColumn } from '@/entities/column/api/column.api'
import { IDeleteCollumnDTO } from '@/entities/column/api/dto/delete-column.dto'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteColumn() {
	const queryClient: QueryClient = useQueryClient()

	const { mutate: deleteColumnMutation, isPending: isColumnDeleting } =
		useMutation({
			mutationKey: ['delete-column'],
			mutationFn: async (
				deleteColumnDTO: IDeleteCollumnDTO
			): Promise<DeleteResult> => await deleteColumn(deleteColumnDTO),
			onSuccess: (): void => {
				toast.success('Колонка удалена')
				queryClient.invalidateQueries({ queryKey: ['project-columns'] })
			},
			onError: (error: Error): void => {
				toastMessageHandler(error)
			}
		})

	return { deleteColumnMutation, isColumnDeleting }
}
