import { MoreVertical } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components/ui'

import { useDeleteTask } from '@/feautures/task/delete-task/model/useDeleteTask.mutation'
import { useParams } from 'next/navigation'

interface ITaskSettingsDropdown {
	taskId: string
}

export function TaskSettingsDropdown({ taskId }: ITaskSettingsDropdown) {
	const { deleteTask } = useDeleteTask()

	const params = useParams<{ projectId: string }>()
	const projectId = params.projectId

	function handleDelete() {
		deleteTask({
			projectId: projectId,
			taskId: taskId
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
