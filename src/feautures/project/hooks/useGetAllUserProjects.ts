import { projectService } from '@/feautures/project/service/project.service'
import { useQuery } from '@tanstack/react-query'

export function useGetAllUserProjects(userId: string | undefined) {
	const { data: projects, isPending: isProjectsLoading } = useQuery({
		queryKey: ['user-projects'],
		queryFn: async () => await projectService.getAllByUserId(userId!),
		enabled: !!userId,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		staleTime: Infinity
	})

	return { projects, isProjectsLoading }
}
