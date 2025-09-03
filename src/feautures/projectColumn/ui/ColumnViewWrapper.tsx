import { Loader } from '@/shared/components/ui'
import { ViewMode } from '@/shared/providers/ProjectView.provider'
import { AddColumnButton } from '@/feautures/projectColumn/add-column'
import { useColumnsByProject } from '@/feautures/projectColumn/get-project-collumns'
import { ColumnView } from '@/feautures/projectColumn/ui/ColumnView'
import { ListView } from '@/feautures/projectColumn/ui/ListView'

interface IColumnView {
	view: ViewMode
	projectId: string
}

export function ColumnViewWrapper({ view, projectId }: IColumnView) {
	const { projectColumns, isColumnsLoading } = useColumnsByProject(projectId)

	if (isColumnsLoading) {
		return <Loader />
	}

	if (!projectColumns || projectColumns.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center p-8 text-center'>
				<h3 className='mb-2 text-lg font-medium'>
					В проекте пока нет колонок
				</h3>
				<p className='text-muted-foreground mb-4'>
					Создайте первую колонку чтобы начать работу
				</p>
				<AddColumnButton columnsLength={0} />
			</div>
		)
	}

	return (
		<div className='p-4'>
			{view === 'columns' ? (
				<ColumnView columns={projectColumns} />
			) : (
				<ListView columns={projectColumns} />
			)}
		</div>
	)
}
