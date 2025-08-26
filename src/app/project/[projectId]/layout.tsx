'use client'

import React, { PropsWithChildren } from 'react'

import { ProjectViewProvider } from '@/feautures/project/providers/ProjectView.provider'
import { ProjectHeader } from '@/widgets/ProjectHeader/components/ProjectHeader'
import { useSelectedLayoutSegments } from 'next/navigation'

interface Props {
	params: Promise<{ projectId: string }>
}

export default function ProjectLayout({
	children,
	params
}: PropsWithChildren<Props>) {
	const segments = useSelectedLayoutSegments()
	const isEditPage = segments.includes('edit')

	const resolvedParams = React.use(params)
	const { projectId } = resolvedParams

	return (
		<ProjectViewProvider>
			<div className='flex max-h-screen flex-col gap-4 overflow-hidden'>
				{!isEditPage && <ProjectHeader projectId={projectId} />}

				<div>{children}</div>
			</div>
		</ProjectViewProvider>
	)
}
