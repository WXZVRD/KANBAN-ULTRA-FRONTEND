import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui'
import { shortenerText } from '@/shared/utils'

type UserCardProps = {
	displayName: string
	picture?: string
	size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
	sm: {
		avatar: 'h-6 w-6',
		text: 'text-sm',
		gap: 'space-x-2'
	},
	md: {
		avatar: 'h-10 w-10',
		text: 'text-base',
		gap: 'space-x-3'
	},
	lg: {
		avatar: 'h-14 w-14',
		text: 'text-lg',
		gap: 'space-x-4'
	}
}

export function UserCard({ picture, displayName, size = 'sm' }: UserCardProps) {
	const { avatar, text, gap } = sizeStyles[size]

	return (
		<div className={`flex items-center ${gap}`}>
			<Avatar className={avatar}>
				<AvatarImage src={picture} alt={displayName} />
				<AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
			</Avatar>
			<span className={text}>{shortenerText(10, displayName)}</span>
		</div>
	)
}
