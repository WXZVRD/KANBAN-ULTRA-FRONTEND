import { Metadata } from 'next'

import { LoginForm } from '../../../feautures/auth/ui'

export const metadata: Metadata = {
	title: 'Вход',
	description: ''
}

export default function LoginPage() {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<LoginForm />
		</div>
	)
}
