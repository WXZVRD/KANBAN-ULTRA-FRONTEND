import { Metadata } from 'next'
import React from 'react'

import { NewVerificationForm } from '@/feautures/auth/components/NewVerificationForm'

const metadata: Metadata = {
	title: 'Верификация'
}

export default function NewVerificationPage() {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<NewVerificationForm />
		</div>
	)
}
