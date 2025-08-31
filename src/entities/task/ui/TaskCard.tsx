import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui'
import { PriorityBadge } from '@/shared/components/ui/priority-badge'
import { cn } from '@/shared/utils'

import { TaskPriority } from '@/entities/task/types/priority.enum'
import { UserTaskAvatar } from '@/entities/user/ui/UserTaskAvatar'
import { IUser } from '@/feautures/auth/types'
import { TaskSettingsDropdown } from '@/feautures/task/ui/TaskSettingsDropdown'

interface ITaskCard {
	id: string
	title: string
	assigneeUser: IUser | null
	projectId: string
	priority: TaskPriority
	columnId: string
}

export function TaskCard({
	id,
	title,
	assigneeUser,
	priority,
	projectId,
	columnId
}: ITaskCard) {
	return (
		<Card
			className={cn(
				'rounded-1xl w-full cursor-pointer border border-gray-200 bg-white p-1 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-zinc-900'
			)}
		>
			<CardHeader className='p-2'>
				<CardTitle className='flex items-start justify-between text-sm font-semibold text-gray-900 dark:text-gray-100'>
					{title}
					<TaskSettingsDropdown
						columnId={columnId}
						taskData={{
							projectId: projectId,
							title: title,
							id: id,
							priority: priority,
							assigneeId: assigneeUser?.id
						}}
					/>
				</CardTitle>
			</CardHeader>
			<CardContent className='flex items-center justify-between p-2 text-sm text-gray-500 dark:text-gray-400'>
				<UserTaskAvatar assignee={assigneeUser} />
				<PriorityBadge priority={priority} />
			</CardContent>
		</Card>
	)
}
