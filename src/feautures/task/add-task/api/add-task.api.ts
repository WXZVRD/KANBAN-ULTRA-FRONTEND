import api from '@/shared/api/axios'

import { TaskPriority } from '@/entities/task/types/priority.enum'

export interface IAddTaskDTO {
	projectId: string
	title: string
	columnId: string
	assigneeId?: string
	priority?: TaskPriority
}

export async function AddTaskApi({
	projectId,
	title,
	columnId,
	assigneeId,
	priority
}: IAddTaskDTO): Promise<any> {
	const res = await api.post(
		`http://localhost:4000/project/${projectId}/task/create`,
		{
			title,
			columnId,
			assigneeId,
			priority,
			projectId
		}
	)

	return res.data
}
