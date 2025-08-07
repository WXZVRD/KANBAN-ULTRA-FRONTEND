'use client'

import { Button, Separator } from '@/shared/components/ui'

import { authService } from '@/feautures/auth/services'
import { AuthMehods } from '@/feautures/auth/types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FaGoogle, FaYandex } from 'react-icons/fa'

export function AuthSocial() {
	const router = useRouter()

	const { mutateAsync } = useMutation({
		mutationKey: ['oauth-by-provider'],
		mutationFn: async (provider: AuthMehods) =>
			await authService.oauthByProvider(provider)
	})

	const onClick = async (provider: AuthMehods) => {
		const response = await mutateAsync(provider)

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
