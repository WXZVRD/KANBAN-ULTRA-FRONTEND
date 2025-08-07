import { Metadata } from 'next'

import { RegisterForm } from '@/feautures/auth/components'

export const metadata: Metadata = {
	title: 'Регистрация',
	description: ''
}

export default function RegisterPage() {
	return <RegisterForm />
}
