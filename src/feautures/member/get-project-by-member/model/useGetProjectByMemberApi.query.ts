import { getProjectByMemberApi } from '@/feautures/member/get-project-by-member/api/getProjectByMember.api'
import { useQuery } from '@tanstack/react-query'

export function useGetAllUserProjects(projectId: string) {
	const { data: projects, isPending: isProjectsLoading } = useQuery({
		queryKey: ['user-projects', projectId],
		queryFn: async ({ queryKey }) => {
			const [, projectId] = queryKey
			return await getProjectByMemberApi(projectId as string)
		},
		enabled: !!projectId,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		staleTime: Infinity
	})

	return { projects, isProjectsLoading }
}
