import axios from 'axios'

export class ProjectService {
	public async getAllByUserId(userId: string): Promise<any[] | null> {
		const res = await axios.get('http://localhost:4000/project/getByUser')

		return res.data
	}
}

export const projectService = new ProjectService()
