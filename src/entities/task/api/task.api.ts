import { DeleteResult } from '@/shared/api'
import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts/api.constant'

import { IAddTaskDTO, IDeleteTaskDTO, ITask, IUpdateTaskDTO } from '@/entities/task'

/**
 * Creates a new task in the specified project
 */
export async function createTask({
	projectId,
	title,
	columnId,
	assigneeId,
	priority
}: IAddTaskDTO): Promise<ITask> {
	const res = await api.post<ITask>(
		API_ENDPOINTS.PROJECT.TASK.CREATE(projectId),
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

/**
 * Deletes a task by ID from the specified project
 */
export async function deleteTask({
	taskId,
	projectId
}: IDeleteTaskDTO): Promise<DeleteResult> {
	const res = await api.delete<DeleteResult>(
		API_ENDPOINTS.PROJECT.TASK.DELETE(projectId, taskId)
	)

	return res.data
}

/**
 * Updates an existing task with provided fields
 * Only included fields will be updated (partial update)
 */
export async function updateTask({
	assigneeId,
	columnId,
	projectId,
	id,
	priority,
	title,
	description
}: IUpdateTaskDTO): Promise<ITask> {
	const res = await api.patch<ITask>(
		API_ENDPOINTS.PROJECT.TASK.UPDATE(projectId),
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
