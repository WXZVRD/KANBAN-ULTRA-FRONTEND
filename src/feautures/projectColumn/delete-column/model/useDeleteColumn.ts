import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { deleteColumnApi, IDeleteCollumnDTO } from '@/feautures/projectColumn/delete-column/api/deleteColumn.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteColumn() {
	const queryClient = useQueryClient()

	const { mutate: deleteColumn, isPending: isColumnDeleting } = useMutation({
		mutationKey: ['delete-column'],
		mutationFn: async (deleteColumnDTO: IDeleteCollumnDTO) =>
			await deleteColumnApi(deleteColumnDTO),
		onSuccess: data => {
			console.log('Колонка успешно удалена', data)
			toast.success('Колонка удалена')
			queryClient.invalidateQueries({ queryKey: ['project-columns'] })
		},
		onError: error => {
			console.error('Ошибка при удалений колонки', error)
			toastMessageHandler(error)
		}
	})

	return { deleteColumn, isColumnDeleting }
}
