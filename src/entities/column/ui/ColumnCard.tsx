import { useState } from 'react'

import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui'

import { IColumn } from '@/entities/column/model/types'
import { ColumnCardSettings } from '@/entities/column/ui/ColumnCardSettings'
import { TaskWrapperContent } from '@/entities/task/ui/TaskWrapperContent'
import { useRenameColumn } from '@/feautures/projectColumn/rename-column/model/useRenameColumn'
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
		<Card className='flex h-full max-h-[100vh] w-80 flex-shrink-0 flex-col'>
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
				<ColumnCardSettings title={title} projectId={projectId} />
			</CardHeader>

			<CardContent className='flex-1 overflow-y-auto'>
				<Droppable droppableId={columnId}>
					{provided => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className='space-y-2'
						>
							<TaskWrapperContent
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
