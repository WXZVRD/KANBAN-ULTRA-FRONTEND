'use client'

import React, { ReactNode, createContext, useEffect, useState } from 'react'

import { STORAGE_KEYS } from '@/shared/consts/storage.constant'
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
		const saved = getLSData<ViewMode>(STORAGE_KEYS.PROJECT_VIEW)
		return saved ?? 'table'
	})

	const setView = (mode: ViewMode) => {
		setViewState(mode)
		setLSData(STORAGE_KEYS.PROJECT_VIEW, mode)
	}

	useEffect(() => {
		const handleStorage = (event: StorageEvent) => {
			if (event.key === STORAGE_KEYS.PROJECT_VIEW && event.newValue) {
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
