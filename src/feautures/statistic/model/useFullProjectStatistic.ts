import { getFullProjectStatisticApi } from '@/feautures/statistic/api/getFullProjectStatistic.api'
import { StatisticProps } from '@/feautures/statistic/types/statistic.interface'
import { useQuery } from '@tanstack/react-query'

export function useFullProjectStatistic(projectId: string) {
	const { data, isLoading: isProjectStatsticLoading } = useQuery({
		queryKey: ['project-statistic', projectId],
		queryFn: async (): Promise<StatisticProps> =>
			await getFullProjectStatisticApi(projectId),
		enabled: !!projectId
	})

	const projectStatistic: StatisticProps = data ?? {
		workload: [],
		priorities: [],
		statuses: [],
		progress: {
			totalTasks: 0,
			doneTasks: 0,
			percent: 0
		}
	}

	return { projectStatistic, isProjectStatsticLoading }
}
