import { useContext } from 'react'

import { ProjectViewContext } from '@/shared/providers/ProjectView.provider'

export function useProjectView() {
	const context = useContext(ProjectViewContext)
	if (!context) {
		throw new Error(
			'useProjectView must be used within a ProjectViewProvider'
		)
	}
	return context
}
