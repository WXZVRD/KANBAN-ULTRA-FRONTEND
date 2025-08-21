import { MoreVertical } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components/ui'

import { useDeleteColumn } from '@/feautures/projectColumn/delete-column/model/useDeleteColumn'

interface IColumnCardSettings {
	title: string
	projectId: string
}

export function ColumnCardSettings({ title, projectId }: IColumnCardSettings) {
	const { deleteColumn, isColumnDeleting } = useDeleteColumn()

	function handleDelete() {
		deleteColumn({
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
				<DropdownMenuItem onClick={() => handleDelete()}>
					Удалить
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
