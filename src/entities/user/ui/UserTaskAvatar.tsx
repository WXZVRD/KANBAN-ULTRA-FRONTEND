import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui'

import { IUser } from '@/feautures/auth/types'

interface IUserTaskAvatar {
	assignee: IUser | null
}

export function UserTaskAvatar({ assignee }: IUserTaskAvatar) {
	return (
		<div className='flex items-center gap-2'>
			<Avatar>
				{assignee ? (
					<>
						<AvatarImage
							src={assignee.picture ?? undefined}
							alt={assignee.displayName}
						/>
						<AvatarFallback>
							{assignee.displayName?.charAt(0).toUpperCase() ??
								'?'}
						</AvatarFallback>
					</>
				) : (
					<AvatarFallback>?</AvatarFallback>
				)}
			</Avatar>

			<span className='text-muted-foreground text-sm font-medium'>
				{assignee?.displayName ?? 'Не назначен'}
			</span>
		</div>
	)
}
