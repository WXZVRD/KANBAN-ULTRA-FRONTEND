'use client'

import { Button, Separator } from '@/shared/components/ui'

import { AuthMehods } from '@/entities/auth/types/auth-methods.enum'
import { oauthByProvider } from '@/feautures/auth/api'
import { useMutation } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { FaGoogle, FaYandex } from 'react-icons/fa'

export function AuthSocial() {
	const router: AppRouterInstance = useRouter()

	const { mutateAsync } = useMutation({
		mutationKey: ['oauth-by-provider'],
		mutationFn: async (provider: AuthMehods) =>
			await oauthByProvider(provider)
	})

	const onClick = async (provider: AuthMehods): Promise<void> => {
		const response: { url: string } = await mutateAsync(provider)

		if (response) {
			router.push(response.url)
		}
	}
	return (
		<>
			<div className='mb-4 grid grid-cols-2 gap-6'>
				<Button
					variant='outline'
					className='mr-2'
					onClick={() => onClick(AuthMehods.GOOGLE)}
				>
					<FaGoogle /> Google
				</Button>
				<Button
					variant='outline'
					className='mr-2'
					onClick={() => onClick(AuthMehods.YANDEX)}
				>
					<FaYandex /> Yandex
				</Button>
			</div>
			<div className='mb-2 space-y-4'>
				<div className='flex items-center gap-4'>
					<Separator className='w-full max-w-[120px]' />
					<span className='text-muted-foreground text-sm'>ИЛИ</span>
					<Separator className='w-full max-w-[120px]' />
				</div>
			</div>
		</>
	)
}
