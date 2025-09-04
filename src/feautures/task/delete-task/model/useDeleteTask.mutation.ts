import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { IDeleteTaskDTO } from '@/entities/task/api/dto/delete-task.dto'
import { deleteTask } from '@/entities/task/api/task.api'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteTask() {
	const queryClient: QueryClient = useQueryClient()

	const { mutate: deleteTaskMutation } = useMutation({
		mutationKey: ['delete-task'],
		mutationFn: async (data: IDeleteTaskDTO): Promise<void> => {
			await deleteTask(data)
		},
		onSuccess: (): void => {
			toast.success('Задача успешно удалена!')
			queryClient.invalidateQueries({ queryKey: ['project-columns'] })
		},
		onError: (error: Error) => toastMessageHandler(error)
	})

	return { deleteTaskMutation }
}
