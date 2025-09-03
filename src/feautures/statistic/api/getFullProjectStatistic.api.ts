import { AxiosResponse } from 'axios'

import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts/api'

import { StatisticProps } from '@/feautures/statistic/types/statistic.interface'

export async function getFullProjectStatisticApi(
	projectId: string
): Promise<StatisticProps> {
	const res: AxiosResponse<StatisticProps, any> =
		await api.get<StatisticProps>(
			API_ENDPOINTS.PROJECT.STATS.GET_FULL(projectId)
		)

	return res.data
}
