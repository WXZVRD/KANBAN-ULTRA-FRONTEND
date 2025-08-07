import axios from 'axios'

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
		try {
			const headers = recaptcha ? { recaptcha } : undefined

			const response = await api.post('auth/login', body, {
				headers: headers
			})

			console.log(`[AuthService] response:`)
			console.log(response)

			return response.data
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				console.log(error.response)
				return error.response.data
			}
		}
	}

	public async logout(): Promise<any> {
		const response = await api.post('auth/logout')

		return response
	}
}

export const authService: AuthService = new AuthService()
