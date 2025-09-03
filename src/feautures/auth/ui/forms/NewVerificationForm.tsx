'use client'

import { useEffect } from 'react'

import { Loader } from '@/shared/components/ui'

import { useVerificationMutation } from '@/feautures/auth/hooks'
import { AuthWrapper } from '@/feautures/auth/ui/common/AuthWrapper'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'

export function NewVerificationForm() {
	const searchParams: ReadonlyURLSearchParams = useSearchParams()

	const token: string | null = searchParams.get('token')

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
