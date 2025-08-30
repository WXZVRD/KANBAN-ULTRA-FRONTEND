import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { AddTaskApi, IAddTaskDTO } from '@/feautures/task/add-task/api/add-task.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useAddTaskMutation() {
	const queryClient = useQueryClient()

	const { mutate: createTask } = useMutation({
		mutationKey: ['add-task'],
		mutationFn: async (data: IAddTaskDTO) => await AddTaskApi(data),
		onSuccess: () => {
			toast.success(`Задача была успешно создана!`)
			queryClient.invalidateQueries({ queryKey: ['project-columns'] })
		},
		onError: error => toastMessageHandler(error)
	})

	return { createTask }
}
