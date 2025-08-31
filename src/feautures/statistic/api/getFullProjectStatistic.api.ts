import api from '@/shared/api/axios'

import { StatisticProps } from '@/feautures/statistic/types/statistic.interface'

export async function getFullProjectStatisticApi(
	projectId: string
): Promise<StatisticProps> {
	const res = await api.get<StatisticProps>(`/project/${projectId}/statistic`)

	return res.data
}
