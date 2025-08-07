import { Button, Separator } from '@/shared/components/ui'

import { FaGoogle, FaYandex } from 'react-icons/fa'

export function AuthSocial() {
	return (
		<>
			<div className='mb-4 grid grid-cols-2 gap-6'>
				<Button variant='outline' className='mr-2'>
					<FaGoogle /> Google
				</Button>
				<Button variant='outline' className='mr-2'>
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
