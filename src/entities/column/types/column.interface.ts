import { ITask } from '@/entities/task/types/task.interface'

export interface IColumn {
	id: string
	title: string
	order: number

	tasks: ITask

	projectId: string

	createdAt: string
	updatedAt: string
}
