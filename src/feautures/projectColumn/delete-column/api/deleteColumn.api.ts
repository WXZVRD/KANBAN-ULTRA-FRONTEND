import api from '@/shared/api/axios'

export interface IDeleteCollumnDTO {
	title: string
	projectId: string
}

export async function deleteColumnApi({
	projectId,
	title
}: IDeleteCollumnDTO): Promise<void> {
	const res = await api.delete(`project_column/${projectId}`, {
		data: { title }
	})

	return res.data
}
