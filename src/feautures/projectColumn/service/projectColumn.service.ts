import api from '@/shared/api/axios'





class ProjectColumnService {
	public async getByProjectId(projectId: string) {
		const res = await api.get(`project_column/${projectId}`)

		return res.data
	}
}

export const projectColumnService = new ProjectColumnService()
