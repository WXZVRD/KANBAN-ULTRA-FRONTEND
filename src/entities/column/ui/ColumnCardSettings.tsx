import { MoreVertical } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Separator
} from '@/shared/components/ui'

import { useDeleteColumn } from '@/feautures/projectColumn/delete-column/model/useDeleteColumn'
import { CreateTaskModal } from '@/feautures/task/add-task/ui/AddTaskModal'

interface IColumnCardSettings {
	columnId: string
	title: string
	projectId: string
}

export function ColumnCardSettings({
	title,
	projectId,
	columnId
}: IColumnCardSettings) {
	const { deleteColumnMutation } = useDeleteColumn()

	function handleDelete(): void {
		deleteColumnMutation({
			title,
			projectId
		})
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className='p-1'>
					<MoreVertical className='h-4 w-4' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onSelect={e => e.preventDefault()}>
					<CreateTaskModal columnId={columnId} />
				</DropdownMenuItem>
				<Separator />
				<DropdownMenuItem onClick={() => handleDelete()}>
					Удалить
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
