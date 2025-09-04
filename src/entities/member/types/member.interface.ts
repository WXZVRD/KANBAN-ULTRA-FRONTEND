import { MemberRole } from '@/entities/member/types/member-role.enum'
import { IProject } from '@/entities/project/types/project.interface'
import { IUser } from '@/entities/user/types/user.interface'

export interface IMember {
	id: string
	user: IUser | undefined
	userId: string
	projectId: string
	project: IProject
	memberRole: MemberRole
}
