import { AxiosResponse } from 'axios'

import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts/api'

import { IColumn } from '@/entities/column/types/column.interface'

export interface IMoveColumnDTO {
	columnId: string
	order: number
}

export async function MoveColumnApi({
	columnId,
	order
}: IMoveColumnDTO): Promise<IColumn> {
	const res: AxiosResponse<IColumn, any> = await api.patch<IColumn>(
		API_ENDPOINTS.PROJECT.COLUMN.MOVE(columnId),
		{
			order
		}
	)

	return res.data
}
