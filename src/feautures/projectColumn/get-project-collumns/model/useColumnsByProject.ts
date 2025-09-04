import { getColumnByProjectId } from '@/entities/column/api/column.api'
import { IColumn } from '@/entities/column/types/column.interface'
import { useQuery } from '@tanstack/react-query'

export function useColumnsByProject(projectId: string) {
	const { data, isPending: isColumnsLoading } = useQuery({
		queryKey: ['project-columns', projectId],
		queryFn: async (): Promise<IColumn[]> =>
			await getColumnByProjectId(projectId),
		enabled: !!projectId
	})

	return { projectColumns: data ?? null, isColumnsLoading }
}
