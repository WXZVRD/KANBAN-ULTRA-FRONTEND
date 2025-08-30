import api from '@/shared/api/axios'

export interface IRenameColumnDTO {
	columnId: string
	title: string
}

export async function renameColumnApi({ columnId, title }: IRenameColumnDTO) {
	const res = await api.post(`project_column/rename/${columnId}`, {
		title
	})

	return res.data
}
