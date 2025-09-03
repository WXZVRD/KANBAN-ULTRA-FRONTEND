import { toast } from 'sonner'

import { DeleteResult } from '@/shared/api'

import { deleteProject } from '@/entities/project/api/project.api'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteProject() {
	const queryClient: QueryClient = useQueryClient()

	const { mutate: deleteProjectMutation, isPending: isDeleting } =
		useMutation({
			mutationKey: ['project-delete'],
			mutationFn: async (projectId: string): Promise<DeleteResult> =>
				await deleteProject(projectId),
			onSuccess: (_, projectId): void => {
				toast.success('Проект успешно удалён', {
					description: `ID: ${projectId}`
				})

				queryClient.invalidateQueries({ queryKey: ['user-projects'] })
			},
			onError: (error: Error): void => {
				toast.error('Ошибка при удалении проекта', {
					description: error?.message ?? 'Попробуйте снова'
				})
			}
		})

	return { deleteProjectMutation, isDeleting }
}
