import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts/api.constant'

import { IColumn } from '@/entities/column'

export interface IRenameColumnDTO {
	columnId: string
	title: string
}

export async function renameColumnApi({
	columnId,
	title
}: IRenameColumnDTO): Promise<IColumn> {
	const res = await api.post<IColumn>(
		API_ENDPOINTS.PROJECT.COLUMN.RENAME(columnId),
		{
			title
		}
	)

	return res.data
}
