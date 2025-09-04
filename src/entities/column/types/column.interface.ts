import { ITask } from '@/entities/task'

export interface IColumn {
	id: string
	title: string
	order: number

	tasks: ITask[]

	projectId: string

	createdAt: string
	updatedAt: string
}
