import type { Metadata } from 'next'

import { CreateProjectForm } from '@/feautures/project/create-project/ui/CreateProjectForm'

export const metadata: Metadata = {
	title: 'Создание проекта'
}

export default function CreateProjectPage() {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<CreateProjectForm />
		</div>
	)
}
