import axios from '@/shared/api/axios'

export class VerificationService {
	public async newVerification(token: string | null) {
		const response = await axios.post('/auth/email-confirmation', { token })

		return response
	}
}

export const verificationService: VerificationService =
	new VerificationService()
