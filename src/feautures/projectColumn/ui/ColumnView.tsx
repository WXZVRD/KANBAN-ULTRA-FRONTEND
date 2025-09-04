import { ColumnCard, IColumn } from '@/entities/column/'
import { AddColumnButton, useMoveColumn } from '@/feautures/projectColumn'
import { useUpdateTask } from '@/feautures/task'
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd'
import { useParams } from 'next/navigation'

interface IColumnView {
	columns: IColumn[]
}

export function ColumnView({ columns }: IColumnView) {
	const params = useParams<{ projectId: string }>()
	const { moveColumn } = useMoveColumn()
	const { updateTaskMutation } = useUpdateTask()

	function onDragEnd(result: DropResult) {
		const { source, destination, draggableId, type } = result

		if (!destination) return

		if (type === 'COLUMN') {
			if (source.index === destination.index) return
			moveColumn({
				columnId: draggableId,
				order: destination.index
			})
			return
		}

		if (type === 'TASK') {
			const sourceColumnId = source.droppableId
			const destColumnId = destination.droppableId

			if (
				sourceColumnId === destColumnId &&
				source.index === destination.index
			) {
				return
			}

			if (sourceColumnId !== destColumnId) {
				updateTaskMutation({
					id: draggableId,
					projectId: params.projectId,
					columnId: destColumnId
				})
			} else {
				updateTaskMutation({
					id: draggableId,
					projectId: params.projectId,
					columnId: destColumnId
				})
			}
		}
	}

	return (
		<div className='w-full overflow-x-auto'>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable
					droppableId='columns'
					direction='horizontal'
					type='COLUMN'
				>
					{provided => (
						<div
							className='flex min-h-[12vh] gap-4'
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{columns.map((col, idx) => (
								<Draggable
									key={col.id}
									draggableId={col.id}
									index={idx}
								>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className='h-full w-full max-w-[300px] overflow-y-auto'
										>
											<ColumnCard column={col} />
										</div>
									)}
								</Draggable>
							))}

							{provided.placeholder}

							{columns.length < 5 && (
								<AddColumnButton
									columnsLength={columns.length}
								/>
							)}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
}
