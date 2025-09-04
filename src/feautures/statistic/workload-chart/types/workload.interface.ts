export interface IWorkloadStat {
	assignee: { id: string; picture: string; displayName: string } | null
	taskCount: number
	percent: number
}
