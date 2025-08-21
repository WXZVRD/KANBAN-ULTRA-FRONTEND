import api from '@/shared/api/axios'

export interface IAddColumnDTO {
	order: number
	title: string
	projectId: string
}

export async function addColumnApi(addColumnDTO: IAddColumnDTO): Promise<void> {
	const res = await api.post('project_column/newOne', addColumnDTO)

	return res.data
}
