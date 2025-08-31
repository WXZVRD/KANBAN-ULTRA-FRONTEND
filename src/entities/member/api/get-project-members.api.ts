import api from '@/shared/api/axios'

import { IMember } from '@/entities/member/types/member.interface'

export async function getProjectMembersApi(
	projectId: string
): Promise<IMember[]> {
	const res = await api.get<IMember[]>(
		`http://localhost:4000/project/${projectId}/membership/project-member`
	)

	return res.data
}
