import { AxiosResponse } from 'axios'

import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts/api'

import { IUser } from '@/entities/user/types/user.interface'
import { TypeSettingsScheme } from '@/feautures/user/schemes'

export async function findProfile(): Promise<IUser> {
	const response: AxiosResponse<IUser, any> = await api.get<IUser>(
		API_ENDPOINTS.USER.FIND_PROFILE
	)

	return response.data
}

export async function updateProfile(body: TypeSettingsScheme): Promise<IUser> {
	const response: AxiosResponse<IUser, any> = await api.patch<IUser>(
		API_ENDPOINTS.USER.UPDATE_PROFILE,
		body
	)

	return response.data
}
