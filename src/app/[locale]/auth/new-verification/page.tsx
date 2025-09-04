import { Metadata } from 'next'
import React from 'react'

import { SITE_NAME } from '@/shared/consts'

import { NewVerificationForm } from '@/feautures/auth/ui/forms/NewVerificationForm'

export const metadata: Metadata = {
	title: `Верификация | ${SITE_NAME}`,
	description: 'Подтвердите ваш аккаунт, чтобы получить доступ к приложению.'
}

export default function NewVerificationPage() {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<NewVerificationForm />
		</div>
	)
}
