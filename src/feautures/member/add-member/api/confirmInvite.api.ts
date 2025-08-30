import api from '@/shared/api/axios'

import { MemberRole } from '@/feautures/auth/types'

export interface IConfirmInviteDTO {
	token: string
	projectId: string
	memberRole: MemberRole
}

export async function confirmInvite({
	token,
	memberRole,
	projectId
}: IConfirmInviteDTO): Promise<void> {
	const res = await api.post(`project/${projectId}/membership/take-invite`, {
		token,
		memberRole
	})

	return res.data
}
