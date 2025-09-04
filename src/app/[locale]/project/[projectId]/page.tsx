'use client'

import { useProjectView } from '@/shared/hooks/useProjectView.hook'

import { ColumnViewWrapper } from '@/feautures/projectColumn/ui/ColumnViewWrapper'
import { useParams } from 'next/navigation'

export default function ProjectPage() {
	const { view } = useProjectView()

	const params = useParams<{ projectId: string }>()
	const projectId = params.projectId

	return <ColumnViewWrapper view={view} projectId={projectId} />
}
