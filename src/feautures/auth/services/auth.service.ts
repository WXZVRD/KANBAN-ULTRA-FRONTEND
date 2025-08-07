import api from '@/shared/api/axios'

import { TypeLoginScheme, TypeRegisterScheme } from '@/feautures/auth/schemes'
import { IUser } from '@/feautures/auth/types'

export class AuthService {
	public async register(
		body: TypeRegisterScheme,
		recaptcha?: string
	): Promise<any> {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>('auth/register', body, {
			headers: headers
		})

		return response
	}

	public async login(
		body: TypeLoginScheme,
		recaptcha?: string
	): Promise<any> {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>('auth/login', body, {
			headers: headers
		})

		return response
	}

	public async logout(): Promise<any> {
		const response = await api.post('auth/logout')

		return response
	}
}

export const authService: AuthService = new AuthService()
