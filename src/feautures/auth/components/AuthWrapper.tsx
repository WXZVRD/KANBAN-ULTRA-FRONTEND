import { type PropsWithChildren } from 'react'

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui'

import { AuthSocial } from '@/feautures/auth/components/AuthSocial'
import Link from 'next/link'

interface AuthWrapperProps {
	heading: string
	description?: string
	backButtonLabel?: string
	backButtonHref?: string
	isShowSocial?: boolean
}

export function AuthWrapper({
	children,
	backButtonLabel,
	backButtonHref,
	heading,
	isShowSocial = false,
	description
}: PropsWithChildren<AuthWrapperProps>) {
	return (
		<Card className='w-full max-w-[400px] overflow-hidden px-6'>
			<CardHeader className='space-y-2'>
				<CardTitle>{heading}</CardTitle>
				{description && (
					<CardDescription>{description}</CardDescription>
				)}
			</CardHeader>
			<CardContent>
				{isShowSocial && <AuthSocial />}
				{children}
			</CardContent>
			<CardFooter>
				{backButtonLabel && backButtonHref && (
					<Button variant='link' className='w-full font-normal'>
						<Link href={backButtonHref}>{backButtonLabel}</Link>
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}
