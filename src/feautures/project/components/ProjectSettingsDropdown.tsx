import { MoreVertical } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components/ui'

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
				<button className="p-1">
					<MoreVertical className="h-4 w-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => router.push(`/project/${projectId}/edit`)}
				>
					Редактировать
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => deleteProject(projectId)}>
					Удалить
				</DropdownMenuItem>
				{showAddMemberButton && (
					<DropdownMenuItem onClick={() => console.log(projectId)}>
						Добавить участника
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
