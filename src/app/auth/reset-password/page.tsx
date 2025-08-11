import { Metadata } from 'next'

import { ResetPasswordForm } from '@/feautures/auth/components'

export const metadata: Metadata = {
	title: 'Востановление пароля'
}

export default function ResetPasswordPage() {
	return <ResetPasswordForm />
}
