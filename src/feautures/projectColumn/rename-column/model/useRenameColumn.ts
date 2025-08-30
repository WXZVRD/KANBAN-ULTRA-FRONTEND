import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { IRenameColumnDTO, renameColumnApi } from '@/feautures/projectColumn/rename-column/api/renameColumn.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useRenameColumn() {
	const queryClient = useQueryClient()

	const { mutate: renameColumn, isPending: isNameChanging } = useMutation({
		mutationKey: ['rename-column'],
		mutationFn: async (data: IRenameColumnDTO) =>
			await renameColumnApi(data),
		onSuccess() {
			toast.success('Таблица успешно переименованна!')
			queryClient.invalidateQueries({ queryKey: ['project-columns'] })
		},
		onError: err => {
			toastMessageHandler(err)
		}
	})

	return { renameColumn, isNameChanging }
}
