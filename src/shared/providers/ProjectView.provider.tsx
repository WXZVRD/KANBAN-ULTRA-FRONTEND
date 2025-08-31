'use client'

import React, { ReactNode, createContext, useEffect, useState } from 'react'

import { getLSData, setLSData } from '@/shared/utils/localStorage.utils'

export type ViewMode = 'columns' | 'table'

interface ProjectViewContextProps {
	view: ViewMode
	setView: (mode: ViewMode) => void
}

export const ProjectViewContext = createContext<
	ProjectViewContextProps | undefined
>(undefined)

interface ProjectViewProviderProps {
	children: ReactNode
}

export function ProjectViewProvider({ children }: ProjectViewProviderProps) {
	const [view, setViewState] = useState<ViewMode>(() => {
		const saved = getLSData<ViewMode>('project_view')
		return saved ?? 'table'
	})

	const setView = (mode: ViewMode) => {
		setViewState(mode)
		setLSData('project_view', mode)
	}

	useEffect(() => {
		const handleStorage = (event: StorageEvent) => {
			if (event.key === 'project_view' && event.newValue) {
				setViewState(event.newValue as ViewMode)
			}
		}
		window.addEventListener('storage', handleStorage)
		return () => window.removeEventListener('storage', handleStorage)
	}, [])

	return (
		<ProjectViewContext.Provider value={{ view, setView }}>
			{children}
		</ProjectViewContext.Provider>
	)
}
