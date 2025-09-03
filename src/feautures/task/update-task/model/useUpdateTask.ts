import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { ITask, IUpdateTaskDTO, updateTask } from '@/entities/task'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateTask() {
	const queryClient: QueryClient = useQueryClient()

	const { mutate: updateTaskMutation } = useMutation({
		mutationKey: ['update-task'],
		mutationFn: async (data: IUpdateTaskDTO): Promise<ITask> =>
			await updateTask(data),
		onSuccess: (): void => {
			queryClient.invalidateQueries(['project-columns'])
			toast.success('Задача обновлена.')
		},
		onError: (error: Error) => toastMessageHandler(error)
	})

	return { updateTaskMutation }
}
