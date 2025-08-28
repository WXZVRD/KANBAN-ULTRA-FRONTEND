import { MoreVertical } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components/ui'

import { TaskModal } from '@/feautures/task/add-task/ui/AddTaskModal'
import { useDeleteTask } from '@/feautures/task/delete-task/model/useDeleteTask.mutation'
import { IUpdateTaskDTO } from '@/feautures/task/update-task/api/update-task.api'
import { useParams } from 'next/navigation'

interface ITaskSettingsDropdown {
	columnId: string
	taskData: IUpdateTaskDTO
}

export function TaskSettingsDropdown({
	taskData,
	columnId
}: ITaskSettingsDropdown) {
	const { deleteTask } = useDeleteTask()

	const params = useParams<{ projectId: string }>()
	const projectId = params.projectId

	function handleDelete() {
		deleteTask({
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
					<TaskModal columnId={columnId} initialValues={taskData} />
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleDelete()}>
					Удалить
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
