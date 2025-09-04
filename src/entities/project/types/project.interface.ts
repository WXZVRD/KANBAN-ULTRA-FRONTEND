import { ProjectAccessType } from '@/entities/project/types/ProjectAcess.enum'
import { IUser } from '@/entities/user/types/user.interface'

export interface IProject {
	accessType: ProjectAccessType
	createdAt: string
	id: string
	owner: IUser
	ownerId: string
	title: string
	updatedAt: string
}
