import { MoreVertical } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Separator
} from '@/shared/components/ui'
import { IUpdateTaskDTO } from '@/feautures/task/update-task/api/update-task.api'
import { UpdateTaskModal } from '@/feautures/task/update-task/ui/UpdateTaskModal'

interface IMemberSettingsDropdown {
	columnId: string
	taskData: IUpdateTaskDTO
}

export function MemberSettingsDropdown({
	taskData,
	columnId
}: IMemberSettingsDropdown) {
	function handleDelete() {}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className='p-1'>
					<MoreVertical className='h-4 w-4' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onSelect={e => e.preventDefault()}>
					<UpdateTaskModal
						columnId={columnId}
						initialValues={taskData}
					/>
				</DropdownMenuItem>
				<Separator />
				<DropdownMenuItem onClick={() => handleDelete()}>
					Удалить
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
