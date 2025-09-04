import { Metadata } from 'next'

import { RegisterForm } from '@/feautures/auth'

export const metadata: Metadata = {
	title: 'Регистрация',
	description: ''
}

export default function RegisterPage() {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<RegisterForm />
		</div>
	)
}
