import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts'

import { MemberRole } from '@/entities/member'

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
	await api.post<void>(
		API_ENDPOINTS.PROJECT.MEMBERSHIP.TAKE_INVITE(projectId),
		{
			token,
			memberRole
		}
	)
}
