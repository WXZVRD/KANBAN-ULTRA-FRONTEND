import { Button } from '@/shared/components/ui'

import Link from 'next/link'

export default function Home() {
	return (
		<>
			<h1 className='mb-5 text-3xl font-bold underline'>Hello world!</h1>
			<Link href='/auth/register'>
				<Button>Авторизоватся</Button>
			</Link>
		</>
	)
}
