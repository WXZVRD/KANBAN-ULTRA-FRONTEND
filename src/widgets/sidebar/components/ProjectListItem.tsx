import { APP_ROUTES } from '@/shared/consts/routes.constant'

import { ProjectSettingsDropdown } from '@/feautures/project/ui/ProjectSettingsDropdown'
import Link from 'next/link'

interface IProjectListItemProps {
	id: string
	title: string
}

export function ProjectListItem({ title, id }: IProjectListItemProps) {
	return (
		<div className='hover:bg-accent hover:text-accent-foreground flex items-center justify-between rounded-md px-2 py-1 text-sm'>
			<Link
				href={APP_ROUTES.PROJECTS.CURRENT(id)}
				className='flex-1 truncate'
			>
				{title}
			</Link>

			<ProjectSettingsDropdown projectId={id} />
		</div>
	)
}
