export interface StatisticProps {
	workload: {
		assignee: { id: string; picture: string; displayName: string } | null
		taskCount: number
		percent: number
	}[]
	priorities: { priority: string; count: number; percent: number }[]
	statuses: {
		columnId: string
		title: string
		taskCount: number
		percent: number
	}[]
	progress: { totalTasks: number; doneTasks: number; percent: number }
}
