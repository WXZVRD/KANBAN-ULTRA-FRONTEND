import api from '@/shared/api/axios'

import { IUser } from '@/feautures/auth/types'
import { TypeSettingsScheme } from '@/feautures/user/schemes'

class UserService {
	public async findProfile(): Promise<IUser> {
		const response = await api.get<IUser>('/users/profile')

		return response.data
	}

	public async updateProfile(body: TypeSettingsScheme): Promise<IUser> {
		const response = await api.patch<IUser>('/users/profile', body)

		return response.data
	}
}

export const userService: UserService = new UserService()
