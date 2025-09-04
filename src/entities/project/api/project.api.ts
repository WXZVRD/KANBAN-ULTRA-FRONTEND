import { DeleteResult } from '@/shared/api'
import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts/api.constant'

import { IProject } from '@/entities/project'
import { TypeCreateProjectScheme, TypeEditProjectScheme } from '@/feautures/project'

export async function deleteProject(projectId: string): Promise<DeleteResult> {
	const res = await api.delete<DeleteResult>(
		API_ENDPOINTS.PROJECT.DELETE(projectId)
	)

	return res.data
}

export async function createProject(
	body: TypeCreateProjectScheme
): Promise<IProject> {
	const res = await api.post<IProject>(API_ENDPOINTS.PROJECT.CREATE, body)

	return res.data
}

export async function editProject(
	projectId: string,
	body: TypeEditProjectScheme
): Promise<IProject> {
	const res = await api.patch<IProject>(
		API_ENDPOINTS.PROJECT.EDIT(projectId),
		body
	)

	return res.data
}

export async function getAllProjectsByUserId(): Promise<IProject[]> {
	const res = await api.get<IProject[]>(API_ENDPOINTS.PROJECT.ALL_BY_USER_ID)

	return res.data
}

export async function getProjectById(projectId: string): Promise<IProject> {
	const res = await api.get<IProject>(
		API_ENDPOINTS.PROJECT.ONE_BY_PROJECT_ID(projectId)
	)

	return res.data
}
