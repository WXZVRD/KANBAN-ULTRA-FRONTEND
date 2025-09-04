'use client'

import { useEffect } from 'react'

import { Loader } from '@/shared/components/ui'
import { APP_ROUTES } from '@/shared/consts'

import { AuthWrapper, useVerificationMutation } from '@/feautures/auth'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'

export function NewVerificationForm() {
	const searchParams: ReadonlyURLSearchParams = useSearchParams()
	const router: AppRouterInstance = useRouter()

	const token: string | null = searchParams.get('token')

	const { verification } = useVerificationMutation(
		() => router.push(APP_ROUTES.AUTH.LOGIN),
		() => router.push(APP_ROUTES.DASHBOARD_SETTINGS)
	)

	useEffect(() => verification(token), [token, verification])
	return (
		<AuthWrapper heading='Подтверждение почты'>
			<div>
				<Loader />
			</div>
		</AuthWrapper>
	)
}
