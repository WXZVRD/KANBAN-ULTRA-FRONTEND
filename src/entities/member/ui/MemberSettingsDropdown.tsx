import { MoreVertical } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Separator
} from '@/shared/components/ui'

import { IUpdateTaskDTO } from '@/entities/task/api/dto/update-task.dto'
import { UpdateTaskModal } from '@/feautures/task/update-task/ui/UpdateTaskModal'

interface IMemberSettingsDropdown {
	columnId: string
	taskData: IUpdateTaskDTO
}

export function MemberSettingsDropdown({
	taskData,
	columnId
}: IMemberSettingsDropdown) {
	const t = useTranslations()

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
					{t('Actions.delete')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
