import { ProjectSettingsDropdown } from '@/feautures/project/components/ProjectSettingsDropdown'
import Link from 'next/link'

interface IProjectListItemProps {
	id: string
	title: string
}

export function ProjectListItem({ title, id }: IProjectListItemProps) {
	return (
		<div className='hover:bg-accent hover:text-accent-foreground flex items-center justify-between rounded-md px-2 py-1 text-sm'>
			<Link href={`/project/${id}`} className='flex-1 truncate'>
				{title}
			</Link>

			<ProjectSettingsDropdown projectId={id} />
		</div>
	)
}
