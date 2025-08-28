import { MoreVertical } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Separator
} from '@/shared/components/ui'

import { useDeleteProject } from '@/feautures/project/hooks/useDeleteProject'
import { useRouter } from 'next/navigation'

interface IProjectSettingsDropdown {
	projectId: string
	showAddMemberButton?: boolean
}

export function ProjectSettingsDropdown({
	projectId,
	showAddMemberButton = false
}: IProjectSettingsDropdown) {
	const router = useRouter()

	const { deleteProject } = useDeleteProject()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className='p-1'>
					<MoreVertical className='h-4 w-4' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem
					onClick={() => router.push(`/project/${projectId}/edit`)}
				>
					Редактировать
				</DropdownMenuItem>
				{showAddMemberButton && (
					<DropdownMenuItem
						onClick={() =>
							router.push(`/project/${projectId}/add-member`)
						}
					>
						Добавить участника
					</DropdownMenuItem>
				)}
				<Separator />
				<DropdownMenuItem onClick={() => deleteProject(projectId)}>
					Удалить
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
