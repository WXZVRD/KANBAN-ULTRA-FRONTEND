import { Loader } from '@/shared/components/ui'

import { ViewMode } from '@/feautures/project/providers/ProjectView.provider'
import { ColumnView } from '@/feautures/projectColumn/components/ColumnView'
import { ListView } from '@/feautures/projectColumn/components/ListView'
import { useColumnsByProject } from '@/feautures/projectColumn/hooks/useColumnsByProject'

interface IColumnView {
	view: ViewMode
	projectId: string
}

export function ColumnViewWrapper({ view, projectId }: IColumnView) {
	const { projectColumns, isColumnsLoading } = useColumnsByProject(projectId)

	if (isColumnsLoading) {
		return <Loader />
	}

	return (
		<>
			<h1 className='text-xl font-semibold'>I COLUMN VIEW</h1>
			<div className='p-4'>
				{view === 'columns' ? (
					<ColumnView columns={projectColumns} />
				) : (
					<ListView columns={projectColumns} />
				)}
			</div>
		</>
	)
}
