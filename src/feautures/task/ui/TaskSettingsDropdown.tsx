import { MoreVertical } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Separator
} from '@/shared/components/ui'

import { IUpdateTaskDTO } from '@/entities/task/api/dto/update-task.dto'
import { useDeleteTask } from '@/feautures/task/delete-task/model/useDeleteTask.mutation'
import { UpdateTaskModal } from '@/feautures/task/update-task/ui/UpdateTaskModal'
import { useParams } from 'next/navigation'

interface ITaskSettingsDropdown {
	columnId: string
	taskData: IUpdateTaskDTO
}

export function TaskSettingsDropdown({
	taskData,
	columnId
}: ITaskSettingsDropdown) {
	const { deleteTaskMutation } = useDeleteTask()

	const params = useParams<{ projectId: string }>()
	const projectId = params.projectId

	function handleDelete() {
		deleteTaskMutation({
			projectId: projectId,
			taskId: taskData.id
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
