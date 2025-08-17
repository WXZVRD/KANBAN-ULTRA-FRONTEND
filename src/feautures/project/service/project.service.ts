import axios from 'axios'

import { TypeCreateProjectScheme } from '@/feautures/project/schemes/CreateProject.scheme'

export class ProjectService {
	public async getAllByUserId(userId: string): Promise<any[] | null> {
		const res = await axios.get('http://localhost:4000/project/getByUser')

		return res.data
	}

	public async create(body: TypeCreateProjectScheme): Promise<any> {
		const res = await axios.post(
			'http://localhost:4000/project/create',
			body
		)

		return res.data
	}
}

export const projectService = new ProjectService()
