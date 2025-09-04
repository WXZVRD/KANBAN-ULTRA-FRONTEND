import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts/api.constant'

import { StatisticProps } from '@/feautures/statistic'

export async function getFullProjectStatisticApi(
	projectId: string
): Promise<StatisticProps> {
	const res = await api.get<StatisticProps>(
		API_ENDPOINTS.PROJECT.STATS.GET_FULL(projectId)
	)

	return res.data
}
