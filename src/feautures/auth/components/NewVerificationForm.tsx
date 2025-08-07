'use client'

import { useEffect } from 'react'

import { Loader } from '@/shared/components/ui'

import { AuthWrapper } from '@/feautures/auth/components/AuthWrapper'
import { useVerificationMutation } from '@/feautures/auth/hooks'
import { useSearchParams } from 'next/navigation'

export function NewVerificationForm() {
	const searchParams = useSearchParams()

	const token = searchParams.get('token')

	const { verification } = useVerificationMutation()

	useEffect(() => verification(token), [token])
	return (
		<AuthWrapper heading='Подтверждение почты'>
			<div>
				<Loader />
			</div>
		</AuthWrapper>
	)
}
