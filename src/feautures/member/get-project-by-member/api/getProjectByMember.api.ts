import api from '@/shared/api/axios'

export async function getProjectByMemberApi(projectId: string) {
	const res = await api.get(
		`/project/${projectId}/membership/get-project-by-member`
	)
	
	return res.data
}
