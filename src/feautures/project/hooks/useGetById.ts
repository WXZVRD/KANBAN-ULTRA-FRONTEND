import { projectService } from '@/feautures/project/service/project.service'
import { useQuery } from '@tanstack/react-query'

export function useGetById(projectId: string) {
	const { data: currentProject, isLoading: isProjectLoading } = useQuery({
		queryKey: ['project-edit', projectId],
		queryFn: async () => await projectService.getById(projectId),
		enabled: !!projectId
	})

	return { currentProject, isProjectLoading }
}
