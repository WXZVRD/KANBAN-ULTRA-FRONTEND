import api from '@/shared/api/axios'

import { TypeCreateProjectScheme } from '@/feautures/project/schemes/CreateProject.scheme'
import { TypeEditProjectScheme } from '@/feautures/project/schemes/EditProject.scheme'

export class ProjectService {
	public async getAllByUserId(userId: string): Promise<any[] | null> {
		const res = await api.get('/project/getByUser')

		return res.data
	}

	public async getById(projectId: string): Promise<any> {
		const res = await api.get(`/project/${projectId}`)

		console.log('RES SERVICE: ', res.data)

		return res.data
	}

	public async create(body: TypeCreateProjectScheme): Promise<any> {
		const res = await api.post('http://localhost:4000/project/create', body)

		return res.data
	}

	public async delete(projectId: string): Promise<any> {
		await api.delete(`/project/${projectId}`)
	}

	public async edit(
		projectId: string,
		body: TypeEditProjectScheme
	): Promise<any> {
		const res = await api.patch(`/project/${projectId}`, body)

		return res.data
	}
}

export const projectService = new ProjectService()
