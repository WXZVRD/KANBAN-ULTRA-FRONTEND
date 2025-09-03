import { getFullProjectStatisticApi } from '@/feautures/statistic/api/getFullProjectStatistic.api'
import { StatisticProps } from '@/feautures/statistic/types/statistic.interface'
import { useQuery } from '@tanstack/react-query'

export function useFullProjectStatistic(projectId: string) {
	const { data: projectStatistic, isPending: isProjectStatsticLoading } =
		useQuery({
			queryKey: ['project-statistic'],
			queryFn: async (): Promise<StatisticProps> =>
				await getFullProjectStatisticApi(projectId),
			enabled: !!projectId
		})

	return { projectStatistic, isProjectStatsticLoading }
}
