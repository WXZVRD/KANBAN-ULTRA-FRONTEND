import { TaskPriority } from '@/entities/task'
import { IUser } from '@/entities/user/types/user.interface'

export interface ITask {
	id: string
	title: string
	description: string
	priority: TaskPriority

	columnId: string
	projectId: string
	assignee: IUser | null

	createdAt: Date
	updatedAt: Date
}
