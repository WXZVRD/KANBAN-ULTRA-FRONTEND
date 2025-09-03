import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { IColumn } from '@/entities/column/types/column.interface'
import { IRenameColumnDTO, renameColumnApi } from '@/feautures/projectColumn/rename-column/api/renameColumn.api'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

export function useRenameColumn() {
	const queryClient: QueryClient = useQueryClient()

	const { mutate: renameColumn, isPending: isNameChanging } = useMutation({
		mutationKey: ['rename-column'],
		mutationFn: async (data: IRenameColumnDTO): Promise<IColumn> =>
			await renameColumnApi(data),
		onSuccess(): void {
			toast.success('Таблица успешно переименованна!')
			queryClient.invalidateQueries({ queryKey: ['project-columns'] })
		},
		onError: (err: Error): void => {
			toastMessageHandler(err)
		}
	})

	return { renameColumn, isNameChanging }
}
