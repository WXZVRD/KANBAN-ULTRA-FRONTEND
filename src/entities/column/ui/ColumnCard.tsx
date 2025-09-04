import { useTranslations } from 'next-intl'

import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui'
import { useInputWithControls } from '@/shared/hooks'

import { ColumnCardSettings, IColumn } from '@/entities/column'
import { TaskCard } from '@/entities/task'
import { useRenameColumn } from '@/feautures/projectColumn'
import { Draggable, Droppable } from '@hello-pangea/dnd'

interface ColumnCardProps {
	column: IColumn
}

export const ColumnCard = ({ column }: ColumnCardProps) => {
	const { renameColumn } = useRenameColumn()
	const { projectId, title, id: columnId } = column

	const t = useTranslations()

	const { value, setValue, isEditing, startEditing, handleSave } =
		useInputWithControls({
			initialValue: title,
			onSave: (newTitle: string) => {
				if (newTitle !== title) {
					renameColumn({ columnId, title: newTitle })
				}
			},
			onCancel: () => setValue(title)
		})

	return (
		<Card className='flex h-full max-h-[100vh] w-full flex-shrink-0 flex-col'>
			<CardHeader className='flex justify-between'>
				{isEditing ? (
					<input
						className='w-full rounded border px-2 py-1 text-sm'
						value={value}
						autoFocus
						onChange={e => setValue(e.target.value)}
						onBlur={handleSave}
					/>
				) : (
					<CardTitle
						className='flex cursor-pointer items-center gap-2'
						onClick={e => {
							e.stopPropagation()
							startEditing()
						}}
					>
						{title}
						{column.tasks.length > 0 && (
							<Badge
								variant='secondary'
								className='ml-2 rounded-sm px-3 py-0 text-xs'
							>
								{column.tasks.length}
							</Badge>
						)}
					</CardTitle>
				)}
				<ColumnCardSettings
					title={title}
					projectId={projectId}
					columnId={columnId}
				/>
			</CardHeader>

			<CardContent className='min-h-[50px] flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
				<Droppable droppableId={columnId} type='TASK'>
					{provided => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className='min-h-[50px] space-y-2 rounded p-2'
						>
							{column.tasks.map((task, index) => (
								<Draggable
									key={task.id}
									draggableId={task.id}
									index={index}
								>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<TaskCard
												id={task.id}
												columnId={task.columnId}
												title={task.title}
												projectId={task.projectId}
												assigneeUser={task.assignee}
												priority={task.priority}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
							{column.tasks.length <= 0 && (
								<div className='py-2 text-center text-gray-400'>
									{t('Common.awarn')}
								</div>
							)}
						</div>
					)}
				</Droppable>
			</CardContent>
		</Card>
	)
}
