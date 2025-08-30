import api from '@/shared/api/axios'

export async function getProjectMembersApi(projectId: string) {
	const res = await api.get(
		`http://localhost:4000/project/${projectId}/membership/project-member`
	)

	return res.data
}
