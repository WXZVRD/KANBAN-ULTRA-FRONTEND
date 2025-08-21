import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { addColumnApi, IAddColumnDTO } from '@/feautures/projectColumn/add-column/api/addColumn.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useAddColumn() {
	const queryClient = useQueryClient()

	const { mutate: addColumn, isPending: isColumnAdding } = useMutation({
		mutationKey: ['add-column'],
		mutationFn: async (addColumnDTO: IAddColumnDTO) =>
			await addColumnApi(addColumnDTO),
		onSuccess: data => {
			console.log('Колонка успешно добавлена', data)
			toast.success('Колонка добавлена')
			queryClient.invalidateQueries({ queryKey: ['project-columns'] })
		},
		onError: error => {
			console.error('Ошибка при добавлении колонки', error)
			toastMessageHandler(error)
		}
	})

	return { addColumn, isColumnAdding }
}
