import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { IMoveColumnDTO, MoveColumnApi } from '@/feautures/projectColumn/move-column/api/move-column.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMoveColumn() {
	const queryClient = useQueryClient()

	const { mutate: moveColumn } = useMutation({
		mutationKey: ['moveColumn'],
		mutationFn: async (data: IMoveColumnDTO) => await MoveColumnApi(data),
		onSuccess: async (_, variables) => {
			queryClient.invalidateQueries(['project-columns'])
			toast.success('Колонка успешно перемещена!')
		},
		onError: error => toastMessageHandler(error)
	})

	return { moveColumn }
}
