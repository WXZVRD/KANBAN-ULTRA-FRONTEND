import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { createTask, IAddTaskDTO, ITask } from '@/entities/task'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

export function useAddTaskMutation() {
	const queryClient: QueryClient = useQueryClient()

	const { mutate: createTaskMutation } = useMutation({
		mutationKey: ['add-task'],
		mutationFn: async (data: IAddTaskDTO): Promise<ITask> =>
			await createTask(data),
		onSuccess: (): void => {
			toast.success(`Задача была успешно создана!`)
			queryClient.invalidateQueries({ queryKey: ['project-columns'] })
		},
		onError: (error: Error) => toastMessageHandler(error)
	})

	return { createTaskMutation }
}
