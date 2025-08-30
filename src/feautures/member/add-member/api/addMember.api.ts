import api from '@/shared/api/axios'

import { MemberRole } from '@/feautures/auth/types'

export interface IAddMemberDTO {
	projectId: string
	email: string
	memberRole: MemberRole
}

export async function AddMemberApi({
	memberRole,
	email,
	projectId
}: IAddMemberDTO) {
	const res = await api.post(`project/${projectId}/membership/invite`, {
		email,
		memberRole
	})

	return res.data
}
