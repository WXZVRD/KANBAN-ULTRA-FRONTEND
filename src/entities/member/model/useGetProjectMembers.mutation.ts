import { memberApi } from '@/entities/member/api/member.api'
import { IMember } from '@/entities/member/types/member.interface'
import { useQuery } from '@tanstack/react-query'

export function useGetProjectMembersQuery(projectId: string) {
	const { data: projectMembers = [], isPending: isProjectMembersLoading } =
		useQuery({
			queryKey: ['project-members'],
			queryFn: async (): Promise<IMember[]> => await memberApi(projectId),
			enabled: !!projectId,
			retry: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			staleTime: Infinity
		})

	return { projectMembers, isProjectMembersLoading }
}
