import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { IColumn } from '@/entities/column/types/column.interface'
import { IMoveColumnDTO, MoveColumnApi } from '@/feautures/projectColumn/move-column/api/move-column.api'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

export function useMoveColumn() {
	const queryClient: QueryClient = useQueryClient()

	const { mutate: moveColumn } = useMutation({
		mutationKey: ['moveColumn'],
		mutationFn: async (data: IMoveColumnDTO): Promise<IColumn> =>
			await MoveColumnApi(data),
		onSuccess: (): void => {
			queryClient.invalidateQueries(['project-columns'])
			toast.success('Колонка успешно перемещена!')
		},
		onError: (error: Error) => toastMessageHandler(error)
	})

	return { moveColumn }
}
