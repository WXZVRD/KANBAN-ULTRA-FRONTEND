import { projectColumnService } from '@/feautures/projectColumn/service/projectColumn.service'
import { useQuery } from '@tanstack/react-query'

export function useColumnsByProject(projectId: string) {
	const { data: projectColumns, isPending: isColumnsLoading } = useQuery({
		queryKey: ['project-columns', projectId],
		queryFn: () => projectColumnService.getByProjectId(projectId),
		enabled: !!projectId
	})

	return { projectColumns, isColumnsLoading }
}
