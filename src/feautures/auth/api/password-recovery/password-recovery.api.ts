import { AxiosResponse } from 'axios'

import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts'

import { IUser } from '@/entities/user'
import { TypeNewPasswordScheme, TypeResetPasswordScheme } from '@/feautures/auth'

export async function resetPassword(
	body: TypeResetPasswordScheme,
	recaptcha?: string
): Promise<AxiosResponse<IUser>> {
	const headers = recaptcha ? { recaptcha } : undefined

	const response = await api.post<IUser>(
		API_ENDPOINTS.AUTH.PASSWORD_RECOVER.RESET,
		body,
		{
			headers: headers
		}
	)

	return response
}

export async function newPassword(
	body: TypeNewPasswordScheme,
	token: string | null,
	recaptcha?: string
): Promise<AxiosResponse<IUser>> {
	const headers = recaptcha ? { recaptcha } : undefined

	const res = await api.post<IUser>(
		API_ENDPOINTS.AUTH.PASSWORD_RECOVER.NEW(token),
		body,
		{
			headers: headers
		}
	)

	return res
}
