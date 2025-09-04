import { DeleteResult } from '@/shared/api'
import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts'

import { IColumn, ICreateColumnDTO, IDeleteCollumnDTO } from '@/entities/column/'

export async function createColumn(
	addColumnDTO: ICreateColumnDTO
): Promise<IColumn> {
	const res = await api.post<IColumn>(
		API_ENDPOINTS.PROJECT.COLUMN.CREATE,
		addColumnDTO
	)

	return res.data
}

export async function getColumnByProjectId(
	projectId: string
): Promise<IColumn[]> {
	const res = await api.get<IColumn[]>(
		API_ENDPOINTS.PROJECT.COLUMN.GET_BY_RPOJECT_ID(projectId)
	)

	return res.data
}

export async function deleteColumn({
	projectId,
	title
}: IDeleteCollumnDTO): Promise<DeleteResult> {
	const res = await api.delete<DeleteResult>(
		API_ENDPOINTS.PROJECT.COLUMN.DELETE(projectId),
		{
			data: { title }
		}
	)

	return res.data
}
