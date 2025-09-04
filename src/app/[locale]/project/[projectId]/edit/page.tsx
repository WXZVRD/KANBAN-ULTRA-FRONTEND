'use client'

import React from 'react'

import { EditProjectForm } from '@/feautures/project/edit-project/ui/EditProjectForm'

interface Props {
	projectId: string
}

export default function EditProjectPage({
	params
}: {
	params: Promise<Props>
}) {
	const resolvedParams = React.use<Props>(params)
	const { projectId } = resolvedParams

	return (
		<div className='my-auto flex justify-center'>
			<EditProjectForm projectId={projectId} />
		</div>
	)
}
