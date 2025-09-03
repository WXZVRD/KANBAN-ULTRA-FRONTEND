import { MoreVertical } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Separator
} from '@/shared/components/ui'
import { APP_ROUTES } from '@/shared/consts/routes'

import { AddMemberModal } from '@/feautures/member/add-member/ui/AddMemberModal'
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

	const { deleteProjectMutation } = useDeleteProject()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className='p-1'>
					<MoreVertical className='h-4 w-4' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem
					onClick={() =>
						router.push(APP_ROUTES.PROJECTS.EDIT(projectId))
					}
				>
					Редактировать
				</DropdownMenuItem>
				{showAddMemberButton && (
					<DropdownMenuItem onClick={e => e.preventDefault()}>
						<AddMemberModal projectId={projectId} />
					</DropdownMenuItem>
				)}
				<Separator />
				<DropdownMenuItem
					onClick={() => deleteProjectMutation(projectId)}
				>
					Удалить
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
