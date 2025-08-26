import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { IUpdateTaskDTO, UpdateTaskApi } from '@/feautures/task/update-task/api/update-task.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateTask() {
	const queryClient = useQueryClient()

	const { mutate: updateTask } = useMutation({
		mutationKey: ['update-task'],
		mutationFn: async (data: IUpdateTaskDTO) => await UpdateTaskApi(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['project-columns'])
			toast.success('Задача обновлена.')
		},
		onError: error => toastMessageHandler(error)
	})

	return { updateTask }
}
