import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { deleteTaskApi, IDeleteTaskDTO } from '@/feautures/task/delete-task/api/delete-task.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteTask() {
	const queryClient = useQueryClient()

	const { mutate: deleteTask } = useMutation<void, Error, IDeleteTaskDTO>({
		mutationKey: ['delete-task'],
		mutationFn: async (data: IDeleteTaskDTO) => {
			return await deleteTaskApi(data)
		},
		onSuccess: () => {
			toast.success('Задача успешно удалена!')
			queryClient.invalidateQueries({ queryKey: ['project-columns'] })
		},
		onError: error => toastMessageHandler(error)
	})

	return { deleteTask }
}
