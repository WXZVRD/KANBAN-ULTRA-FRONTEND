import api from '@/shared/api/axios'

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

export async function UpdateTaskApi({
	assigneeId,
	columnId,
	projectId,
	id,
	priority,
	title,
	description
}: IUpdateTaskDTO) {
	const res = await api.patch(
		`http://localhost:4000/project/${projectId}/task/update`,
		{
			id,
			assigneeId,
			columnId,
			priority,
			title,
			description
		}
	)

	return res.data
}
