import { Metadata } from 'next'
import React from 'react'

import { ResetPasswordForm } from '../../../feautures/auth/ui'
import { ResetPasswordForm } from '../../../feautures/auth/ui'

export const metadata: Metadata = {
	title: 'Востановление пароля'
}

export default function ResetPasswordPage() {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<ResetPasswordForm />
		</div>
	)
}
