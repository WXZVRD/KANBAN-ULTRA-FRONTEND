import { MoreVertical } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components/ui'

import { useDeleteProject } from '@/feautures/project/hooks/useDeleteProject'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface IProjectListItemProps {
	id: string
	title: string
}

export function ProjectListItem({ title, id }: IProjectListItemProps) {
	const router = useRouter()

	const { deleteProject } = useDeleteProject()

	return (
		<div className='hover:bg-accent hover:text-accent-foreground flex items-center justify-between rounded-md px-2 py-1 text-sm'>
			<Link href={`/project/${id}`} className='flex-1 truncate'>
				{title}
			</Link>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className='p-1'>
						<MoreVertical className='h-4 w-4' />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						onClick={() => router.push(`/project/${id}/edit`)}
					>
						Редактировать
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => deleteProject(id)}>
						Удалить
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
