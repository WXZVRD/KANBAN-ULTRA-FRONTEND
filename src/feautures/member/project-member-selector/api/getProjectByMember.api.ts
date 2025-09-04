import { AxiosResponse } from 'axios'

import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts/api.constant'

import { IMember } from '@/entities/member/types/member.interface'

export async function getProjectByMemberApi(
	projectId: string
): Promise<IMember[]> {
	const res: AxiosResponse<IMember[]> = await api.get<IMember[]>(
		API_ENDPOINTS.PROJECT.MEMBERSHIP.BY_MEMBER(projectId)
	)

	return res.data
}
