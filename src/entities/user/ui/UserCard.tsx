import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui'





type UserCardProps = {
	displayName: string
	picture?: string
}

export function UserCard({ picture, displayName }: UserCardProps) {
	return (
		<div className='flex items-center space-x-2'>
			<Avatar className='h-6 w-6'>
				<AvatarImage src={picture} alt={displayName} />
				<AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
			</Avatar>
			<span className='text-sm'>{displayName}</span>
		</div>
	)
}
