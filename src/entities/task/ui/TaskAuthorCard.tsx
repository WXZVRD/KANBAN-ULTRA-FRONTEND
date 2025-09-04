import { useTranslations } from 'next-intl'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui'

import { IUser } from '@/entities/user/types/user.interface'

interface ITaskAuthorCard {
	assignee: IUser | null
}

export function TaskAuthorCard({ assignee }: ITaskAuthorCard) {
	const t = useTranslations()

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
				{assignee?.displayName ?? t('User.unassigned')}
			</span>
		</div>
	)
}
