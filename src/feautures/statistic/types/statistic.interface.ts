import { IPriorityStat } from '@/feautures/statistic/priority-chart'
import { IProgressStat } from '@/feautures/statistic/project-progress/types/progress.interface'
import { IStatusStat } from '@/feautures/statistic/status-chart/types/status.interface'
import { IWorkloadStat } from '@/feautures/statistic/workload-chart/types/workload.interface'

export interface StatisticProps {
	workload: IWorkloadStat[]
	priorities: IPriorityStat[]
	statuses: IStatusStat[]
	progress: IProgressStat
}
