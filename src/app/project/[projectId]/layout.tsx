'use client'

import React, { PropsWithChildren } from 'react'

import { ProjectViewProvider } from '@/shared/providers/ProjectView.provider'

import { useConfirmEmail } from '@/feautures/member/add-member/hooks/useConfirmEmail.hook'
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

	useConfirmEmail()

	return (
		<ProjectViewProvider>
			<div className='flex max-h-screen flex-col gap-4 overflow-hidden'>
				{!isEditPage && <ProjectHeader projectId={projectId} />}

				<div>{children}</div>
			</div>
		</ProjectViewProvider>
	)
}
