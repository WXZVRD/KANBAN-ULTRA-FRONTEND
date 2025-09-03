import { AxiosResponse } from 'axios'

import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts/api'

import { MemberRole } from '@/entities/member/types/member-role.enum'
import { IMember } from '@/entities/member/types/member.interface'

export interface IChangeRoleDTO {
	projectId: string
	memberRole: MemberRole
	userId: string
}

export async function ChangeRoleApi({
	memberRole,
	projectId,
	userId
}: IChangeRoleDTO): Promise<IMember> {
	const res: AxiosResponse<IMember, any> = await api.patch<IMember>(
		API_ENDPOINTS.PROJECT.MEMBERSHIP.CHANGE_ROLE(projectId),
		{
			userId,
			memberRole
		}
	)

	return res.data
}
