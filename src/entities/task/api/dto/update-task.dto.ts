import { TaskPriority } from '@/entities/task/types/priority.enum'

export interface IUpdateTaskDTO {
	id: string
	projectId: string
	title?: string
	description?: string
	columnId?: string
	assigneeId?: string
	priority?: TaskPriority
}
