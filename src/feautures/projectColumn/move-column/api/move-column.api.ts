import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts/api.constant'

import { IColumn } from '@/entities/column'

export interface IMoveColumnDTO {
	columnId: string
	order: number
}

export async function MoveColumnApi({
	columnId,
	order
}: IMoveColumnDTO): Promise<IColumn> {
	const res = await api.patch<IColumn>(
		API_ENDPOINTS.PROJECT.COLUMN.MOVE(columnId),
		{
			order
		}
	)

	return res.data
}
