import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { createColumn } from '@/entities/column/api/column.api'
import { ICreateColumnDTO } from '@/entities/column/api/dto/create-column.dto'
import { IColumn } from '@/entities/column/types/column.interface'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

export function useAddColumn() {
	const queryClient: QueryClient = useQueryClient()

	const { mutate: addColumn, isPending: isColumnAdding } = useMutation({
		mutationKey: ['add-column'],
		mutationFn: async (addColumnDTO: ICreateColumnDTO): Promise<IColumn> =>
			await createColumn(addColumnDTO),
		onSuccess: (data: IColumn): void => {
			toast.success(`Колонка ${data.title} добавлена`)
			queryClient.invalidateQueries({ queryKey: ['project-columns'] })
		},
		onError: (error: Error): void => {
			toastMessageHandler(error)
		}
	})

	return { addColumn, isColumnAdding }
}
