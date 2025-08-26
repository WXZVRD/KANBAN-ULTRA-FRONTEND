import api from '@/shared/api/axios'

export interface IMoveColumnDTO {
	columnId: string
	order: number
}

export async function MoveColumnApi({
	columnId,
	order
}: IMoveColumnDTO): Promise<void> {
	const res = await api.patch(`/project_column/move/${columnId}`, {
		order
	})

	return res.data
}
