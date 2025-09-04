import { AxiosResponse } from 'axios'

import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts'

import { AuthMehods } from '@/entities/auth'
import { IUser } from '@/entities/user'
import { TypeLoginScheme, TypeRegisterScheme } from '@/feautures/auth'

export async function registerAuth(
	body: TypeRegisterScheme,
	recaptcha?: string
): Promise<AxiosResponse<IUser>> {
	const headers = recaptcha ? { recaptcha } : undefined

	const response = await api.post<IUser>(API_ENDPOINTS.AUTH.REGISTER, body, {
		headers: headers
	})

	return response
}

export async function loginAuth(
	body: TypeLoginScheme,
	recaptcha?: string
): Promise<IUser> {
	const headers = recaptcha ? { recaptcha } : undefined

	const res = await api.post<IUser>(API_ENDPOINTS.AUTH.LOGIN, body, {
		headers: headers
	})

	return res.data
}

export async function oauthByProvider(
	provider: AuthMehods
): Promise<{ url: string }> {
	const res = await api.get<{ url: string }>(
		API_ENDPOINTS.AUTH.OAUTH_BY_PROVIDER(provider)
	)

	return res.data
}

export async function logoutAuth(): Promise<AxiosResponse<void>> {
	const res = await api.post<void>(API_ENDPOINTS.AUTH.LOGOUT)

	return res
}
