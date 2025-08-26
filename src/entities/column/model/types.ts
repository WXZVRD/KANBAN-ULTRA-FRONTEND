import { ITask } from '@/entities/task/types/task.interface'

export interface IColumn {
	id: string
	projectId: string
	title: string
	order: number
	tasks: ITask[]
	createdAt: string
	updatedAt: string
}
