'use client'

import { createContext, useContext, useState } from 'react'

type ViewMode = 'columns' | 'table'

interface ProjectViewContextType {
	view: ViewMode
	setView: (mode: ViewMode) => void
}

const ProjectViewContext = createContext<ProjectViewContextType | undefined>(
	undefined
)

export function ProjectViewProvider({
	children
}: {
	children: React.ReactNode
}) {
	const [view, setView] = useState<ViewMode>('columns')

	return (
		<ProjectViewContext.Provider value={{ view, setView }}>
			{children}
		</ProjectViewContext.Provider>
	)
}

export function useProjectView() {
	const ctx = useContext(ProjectViewContext)
	if (!ctx)
		throw new Error(
			'useProjectView must be used inside ProjectViewProvider'
		)
	return ctx
}
