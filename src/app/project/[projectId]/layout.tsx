'use client'

import { ProjectHeader } from '@/widgets/ProjectHeader/components/ProjectHeader'
import { useSelectedLayoutSegments } from 'next/navigation'

export default function ProjectLayout({
	children,
	params
}: Readonly<{
	children: React.ReactNode
	params: { projectId: string }
}>) {
	const segments = useSelectedLayoutSegments()
	const isEditPage = segments.includes('edit')

	return (
		<div className='flex flex-col gap-4'>
			{!isEditPage && <ProjectHeader projectId={params.projectId} />}

			<div>{children}</div>
		</div>
	)
}
