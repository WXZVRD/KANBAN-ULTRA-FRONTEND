import { TaskPriority } from '@/entities/task/types/priority.enum'
import { IUser } from '@/feautures/auth/types'

export interface ITask {
	id: string
	title: string
	description: string
	priority: TaskPriority

	assignee: IUser | null

	createdAt: Date
	updatedAt: Date
}
