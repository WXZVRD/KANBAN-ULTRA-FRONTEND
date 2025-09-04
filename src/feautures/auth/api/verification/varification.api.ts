import api from '@/shared/api/axios'
import { API_ENDPOINTS } from '@/shared/consts'

export async function newVerification(token: string | null) {
	const response = await api.post(API_ENDPOINTS.AUTH.EMAIL_CONFIRM, {
		token
	})

	return response
}
