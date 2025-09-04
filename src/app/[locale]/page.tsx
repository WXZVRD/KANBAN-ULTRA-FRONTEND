import { Button } from '@/shared/components/ui'
import { APP_ROUTES } from '@/shared/consts/routes.constant'

import Link from 'next/link'

export default function Home() {
	return (
		<>
			<h1 className='mb-5 text-3xl font-bold underline'>Hello world!</h1>
			<Link href={APP_ROUTES.AUTH.REGISTER}>
				<Button>Register</Button>
			</Link>
		</>
	)
}
