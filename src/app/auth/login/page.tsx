import { Metadata } from 'next'

import { LoginForm } from '@/feautures/auth/components'

export const metadata: Metadata = {
	title: 'Вход',
	description: ''
}

export default function LoginPage() {
	return <LoginForm />
}
