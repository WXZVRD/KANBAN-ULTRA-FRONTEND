import api from '@/shared/api/axios'

import { MemberRole } from '@/feautures/auth/types'

export interface IChangeRoleDTO {
	projectId: string
	memberRole: MemberRole
	userId: string
}

export async function ChangeRoleApi({
	memberRole,
	projectId,
	userId
}: IChangeRoleDTO) {
	const res = await api.patch(
		`project/${projectId}/membership/update-member`,
		{
			userId,
			memberRole
		}
	)

	return res.data
}
