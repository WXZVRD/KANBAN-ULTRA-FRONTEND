import { getProjectById } from '@/entities/project/api/project.api'
import { IProject } from '@/entities/project/types/project.interface'
import { useQuery } from '@tanstack/react-query'

export function useGetById(projectId: string) {
	const { data, isLoading: isProjectLoading } = useQuery({
		queryKey: ['project-edit', projectId],
		queryFn: async (): Promise<IProject> => await getProjectById(projectId),
		enabled: !!projectId
	})

	return { currentProject: data ?? null, isProjectLoading }
}
