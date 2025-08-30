import { getProjectMembersApi } from '@/entities/member/api/get-project-members.api'
import { useQuery } from '@tanstack/react-query'

export function useGetProjectMembersQuery(projectId: string) {
	const { data: projectMembers, isPending: isProjectMembersLoading } =
		useQuery({
			queryKey: ['project-members'],
			queryFn: async () => await getProjectMembersApi(projectId),
			enabled: !!projectId,
			retry: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			staleTime: Infinity
		})

	return { projectMembers, isProjectMembersLoading }
}
