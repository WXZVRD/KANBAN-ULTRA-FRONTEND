import api from '@/shared/api/axios'

export interface IDeleteTaskDTO {
	projectId: string
	taskId: string
}

export async function deleteTaskApi({
	taskId,
	projectId
}: IDeleteTaskDTO): Promise<void> {
	const res = await api.delete(`project/${projectId}/task/${taskId}`)

	return res.data
}
