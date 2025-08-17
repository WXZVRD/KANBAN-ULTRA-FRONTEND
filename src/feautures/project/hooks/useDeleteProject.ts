import { toast } from 'sonner'

import { projectService } from '@/feautures/project/service/project.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteProject() {
	const queryClient = useQueryClient()

	const { mutate: deleteProject, isPending: isDeleting } = useMutation({
		mutationKey: ['project-delete'],
		mutationFn: async (projectId: string) => {
			return await projectService.delete(projectId)
		},
		onSuccess: (_, projectId) => {
			toast.success('Проект успешно удалён', {
				description: `ID: ${projectId}`
			})

			queryClient.invalidateQueries({ queryKey: ['user-projects'] })
		},
		onError: (error: any) => {
			toast.error('Ошибка при удалении проекта', {
				description: error?.message ?? 'Попробуйте снова'
			})
		}
	})

	return { deleteProject, isDeleting }
}
