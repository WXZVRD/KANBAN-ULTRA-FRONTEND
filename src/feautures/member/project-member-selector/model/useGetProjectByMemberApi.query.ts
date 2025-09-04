import { IMember } from '@/entities/member/types/member.interface'
import { getProjectByMemberApi } from '@/feautures/member/project-member-selector/api/getProjectByMember.api'
import { useQuery } from '@tanstack/react-query'

export function useGetAllUserProjects(projectId: string = '123') {
	const { data: projects, isPending: isProjectsLoading } = useQuery({
		queryKey: ['user-projects', projectId],
		queryFn: async (): Promise<IMember[]> =>
			await getProjectByMemberApi(projectId),
		enabled: !!projectId,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		staleTime: Infinity
	})

	return { projects, isProjectsLoading }
}
