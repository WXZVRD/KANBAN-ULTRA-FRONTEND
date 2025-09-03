import { useState } from 'react'

import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui'

import { IColumn } from '@/entities/column/types/column.interface'
import { ColumnCardSettings } from '@/entities/column/ui/ColumnCardSettings'
import { useRenameColumn } from '@/feautures/projectColumn/rename-column/model/useRenameColumn'
import { TaskColumnList } from '@/widgets/task/ui/TaskColumnList'
import { Droppable } from '@hello-pangea/dnd'

interface ColumnCardProps {
	column: IColumn
}

export const ColumnCard = ({ column }: ColumnCardProps) => {
	const { renameColumn } = useRenameColumn()
	const { projectId, order, title, id: columnId } = column

	const [isEditing, setIsEditing] = useState(false)
	const [newTitle, setNewTitle] = useState<string>(title)

	const handleBlur = () => {
		setIsEditing(false)
		if (newTitle.trim() && newTitle !== title) {
			renameColumn({ columnId, title: newTitle })
		} else {
			renameColumn({ columnId, title: newTitle })
			setNewTitle(title)
		}
	}

	return (
		<Card className='flex h-full max-h-[100vh] w-full flex-shrink-0 flex-col'>
			<CardHeader className='flex justify-between'>
				{isEditing ? (
					<input
						className='w-full rounded border px-2 py-1 text-sm'
						value={newTitle}
						autoFocus
						onChange={e => setNewTitle(e.target.value)}
						onBlur={handleBlur}
					/>
				) : (
					<CardTitle
						className='flex cursor-pointer items-center gap-2'
						onClick={e => {
							e.stopPropagation()
							setIsEditing(true)
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
					columnId={column.id}
				/>
			</CardHeader>

			<CardContent className='flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
				<Droppable droppableId={columnId}>
					{provided => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className='space-y-2'
						>
							<TaskColumnList
								tasks={column.tasks}
								columnId={columnId}
							/>
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</CardContent>
		</Card>
	)
}
