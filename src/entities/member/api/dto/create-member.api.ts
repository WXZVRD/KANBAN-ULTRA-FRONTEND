import { MemberRole } from '@/entities/member/types/member-role.enum'

export interface ICreateMemberDTO {
	projectId: string
	email: string
	memberRole: MemberRole
}
