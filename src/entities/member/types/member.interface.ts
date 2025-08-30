import { IUser, UserRole } from '@/feautures/auth/types'

export interface IMember {
	id: string
	user: IUser | undefined
	userId: string
	projectId: string
	memberRole: UserRole
}
