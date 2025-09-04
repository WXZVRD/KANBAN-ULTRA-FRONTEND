import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts/api.constant'

import { IMember, MemberRole } from '@/entities/member'

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
	const res = await api.patch<IMember>(
		API_ENDPOINTS.PROJECT.MEMBERSHIP.CHANGE_ROLE(projectId),
		{
			userId,
			memberRole
		}
	)

	return res.data
}
