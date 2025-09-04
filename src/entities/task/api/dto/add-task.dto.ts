import { TaskPriority } from '@/entities/task/types/priority.enum'

export interface IAddTaskDTO {
	projectId: string
	title: string
	columnId: string
	assigneeId?: string
	priority?: TaskPriority
}
