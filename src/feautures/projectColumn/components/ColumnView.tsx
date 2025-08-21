import { IColumn } from '@/entities/column/model/types'
import { ColumnCard } from '@/entities/column/ui/ColumnCard'
import { AddColumnButton } from '@/feautures/projectColumn/add-column/ui/AddColumnButton'
import { useParams } from 'next/navigation'

interface IColumnView {
	columns: IColumn[]
}

export function ColumnView({ columns }: IColumnView) {
	const params = useParams<{ projectId: string }>()

	return (
		<div className='w-full overflow-x-auto'>
			<div className='flex min-h-[72vh] gap-4'>
				{columns.map((col, idx) => (
					<ColumnCard
						key={col.id}
						columnId={col.id}
						title={col.title}
						projectId={params.projectId}
					/>
				))}

				{columns.length < 5 && (
					<AddColumnButton columnsLength={columns.length++} />
				)}
			</div>
		</div>
	)
}
