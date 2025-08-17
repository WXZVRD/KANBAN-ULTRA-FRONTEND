import { projectService } from '@/feautures/project/service/project.service'
import { useQuery } from '@tanstack/react-query'

export function useGetById(projectId: string) {
	const { data: currentProject, isLoading: isProjectLoading } = useQuery({
		queryKey: ['project-edit', projectId],
		queryFn: async () => {
			const res = await projectService.getById(projectId)
			console.log('projectId: ', projectId)
			console.log('RES TANSTACK: ', res)
			return res
		},
		enabled: !!projectId
	})

	return { currentProject, isProjectLoading }
}
