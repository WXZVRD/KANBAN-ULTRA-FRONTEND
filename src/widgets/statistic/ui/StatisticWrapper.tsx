'use client'

import {
	PriorityChart,
	ProgressChart,
	StatusChart,
	useFullProjectStatistic,
	WorkLoadChart
} from '@/feautures/statistic'

interface IStatisticWrapper {
	projectId: string
}

export function StatisticWrapper({ projectId }: IStatisticWrapper) {
	const { projectStatistic, isProjectStatsticLoading } =
		useFullProjectStatistic(projectId)

	return (
		<div className='grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-2'>
			<WorkLoadChart
				data={projectStatistic.workload}
				isLoading={isProjectStatsticLoading}
			/>

			<PriorityChart
				data={projectStatistic.priorities}
				isLoading={isProjectStatsticLoading}
			/>

			<StatusChart
				data={projectStatistic.statuses}
				isLoading={isProjectStatsticLoading}
			/>

			<ProgressChart
				data={projectStatistic.progress}
				isLoading={isProjectStatsticLoading}
			/>
		</div>
	)
}
