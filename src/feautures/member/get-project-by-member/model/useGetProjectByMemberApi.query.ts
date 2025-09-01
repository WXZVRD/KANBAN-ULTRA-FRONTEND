import { getProjectByMemberApi } from '@/feautures/member/get-project-by-member/api/getProjectByMember.api'
import { useQuery } from '@tanstack/react-query'

export function useGetAllUserProjects(projectId: string = '123') {
	const { data: projects, isPending: isProjectsLoading } = useQuery({
		queryKey: ['user-projects', projectId],
		queryFn: async () => await getProjectByMemberApi(projectId),
		enabled: !!projectId,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		staleTime: Infinity
	})

	return { projects, isProjectsLoading }
}
