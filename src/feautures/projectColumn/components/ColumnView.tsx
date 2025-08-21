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
		<div className="w-full overflow-x-auto">
			<div className="flex min-h-[72vh] gap-4 p-4">
				{columns.map((col, idx) => (
					<ColumnCard
						key={idx}
						title={col.title}
						projectId={params.projectId}
					/>
				))}

				<AddColumnButton columnsLength={columns.length++} />
			</div>
		</div>
	)
}
