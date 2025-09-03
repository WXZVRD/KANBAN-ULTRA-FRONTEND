import { AuthMehods } from '@/entities/auth/types/auth-methods.enum'
import { IAccount } from '@/entities/user/types/account.interface'
import { UserRole } from '@/entities/user/types/user-role.enum'

export interface IUser {
	id: string
	createdAt: string
	updatedAt: string
	email: string
	password: string
	displayName: string
	picture: string
	role: UserRole
	isVerified: boolean
	isTwoFactorEnabled: boolean
	method: AuthMehods
	accounts: IAccount[]
}
