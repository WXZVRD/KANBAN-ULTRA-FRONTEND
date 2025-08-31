import api from '@/shared/api/axios'

export interface IDeleteMemberDTO {
	projectId: string
	ids: string[]
}

export async function deleteMemberApi({ ids, projectId }: IDeleteMemberDTO) {
	console.log('APIAPIAPIO: ', ids)

	const res = await api.delete(
		`project/${projectId}/membership/members/all`,
		{
			data: {
				ids
			}
		}
	)

	return res.data
}
