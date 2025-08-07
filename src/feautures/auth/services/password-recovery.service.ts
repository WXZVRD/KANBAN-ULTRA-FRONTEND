import api from '@/shared/api/axios'

import { TypeNewPasswordScheme } from '@/feautures/auth/schemes'
import { TypeResetPasswordScheme } from '@/feautures/auth/schemes/reset-password.scheme'
import { IUser } from '@/feautures/auth/types'

export class PasswordRecoveryService {
	public async reset(
		body: TypeResetPasswordScheme,
		recaptcha?: string
	): Promise<any> {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>(
			'auth/password-recovery/reset',
			body,
			{
				headers: headers
			}
		)

		return response
	}

	public async new(
		body: TypeNewPasswordScheme,
		token: string | null,
		recaptcha?: string
	): Promise<any> {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>(
			`auth/password-recovery/new/${token}`,
			body,
			{
				headers: headers
			}
		)

		return response
	}
}

export const passwordRecoveryService: PasswordRecoveryService =
	new PasswordRecoveryService()
