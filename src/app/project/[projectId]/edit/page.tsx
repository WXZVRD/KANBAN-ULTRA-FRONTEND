'use client'

import React from 'react'

import { EditProjectForm } from '@/feautures/project/components/EditProjectForm'

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

	return <EditProjectForm projectId={projectId} />
}
