import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui'

import { ColumnCardSettings } from '@/entities/column/ui/ColumnCardSettings'
import { useRenameColumn } from '@/feautures/projectColumn/rename-column/model/useRenameColumn'

interface ColumnCardProps {
	columnId: string
	title: string
	projectId: string
	children?: React.ReactNode
}

export const ColumnCard = ({
	columnId,
	title,
	projectId,
	children
}: ColumnCardProps) => {
	const { renameColumn, isNameChanging } = useRenameColumn()

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

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.currentTarget.blur()
		}
		if (e.key === 'Escape') {
			renameColumn({ columnId, title: newTitle })
			setNewTitle(title)
			setIsEditing(false)
		}
	}

	return (
		<Card className='w-80 flex-shrink-0'>
			<CardHeader className='flex justify-between'>
				{isEditing ? (
					<input
						className='w-full rounded border px-2 py-1 text-sm'
						value={newTitle}
						autoFocus
						onChange={e => setNewTitle(e.target.value)}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
					/>
				) : (
					<CardTitle
						className='cursor-pointer'
						onClick={() => setIsEditing(true)}
					>
						{title}
					</CardTitle>
				)}
				<div className=''>
					<ColumnCardSettings title={title} projectId={projectId} />
				</div>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	)
}
