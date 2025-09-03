import { AxiosResponse } from 'axios'

import { DeleteResult } from '@/shared/api'
import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts/api'

import { ICreateMemberDTO } from '@/entities/member/api/dto/create-member.api'
import { IDeleteMemberDTO } from '@/entities/member/api/dto/delete-member.dto'
import { IMember } from '@/entities/member/types/member.interface'

export async function memberApi(projectId: string): Promise<IMember[]> {
	const res = await api.get<IMember[]>(
		API_ENDPOINTS.PROJECT.MEMBERSHIP.BY_PROJECT_ID(projectId)
	)

	return res.data
}

export async function createMember({
	memberRole,
	email,
	projectId
}: ICreateMemberDTO): Promise<boolean> {
	const res: AxiosResponse<boolean, any> = await api.post<boolean>(
		API_ENDPOINTS.PROJECT.MEMBERSHIP.INVITE(projectId),
		{
			email,
			memberRole
		}
	)

	return res.data
}

export async function deleteAllMembers({
	ids,
	projectId
}: IDeleteMemberDTO): Promise<DeleteResult> {
	const res: AxiosResponse<DeleteResult, any> =
		await api.delete<DeleteResult>(
			API_ENDPOINTS.PROJECT.MEMBERSHIP.DELETE_ALL(projectId),
			{
				data: {
					ids
				}
			}
		)

	return res.data
}
