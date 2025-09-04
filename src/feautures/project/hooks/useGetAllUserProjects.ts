import { getAllProjectsByUserId } from '@/entities/project/api/project.api'
import { IProject } from '@/entities/project/types/project.interface'
import { useQuery } from '@tanstack/react-query'

export function useGetAllUserProjects(userId: string | undefined) {
	const { data, isPending: isProjectsLoading } = useQuery({
		queryKey: ['user-projects'],
		queryFn: async (): Promise<IProject[]> =>
			await getAllProjectsByUserId(),
		enabled: !!userId,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		staleTime: Infinity
	})

	return { projects: data ?? null, isProjectsLoading }
}
