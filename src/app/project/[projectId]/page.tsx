'use client'

import { useProjectView } from '@/feautures/project/providers/ProjectView.provider'
import { ColumnViewWrapper } from '@/feautures/projectColumn/components/ColumnViewWrapper'
import { useParams } from 'next/navigation'

export default function ProjectPage() {
	const { view } = useProjectView()

	const params = useParams<{ projectId: string }>()
	const projectId = params.projectId

	return <ColumnViewWrapper view={view} projectId={projectId} />
}
