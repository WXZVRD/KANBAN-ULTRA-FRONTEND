'use client'

import { useTranslations } from 'next-intl'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Skeleton
} from '@/shared/components/ui'
import { APP_ROUTES } from '@/shared/consts'

import { IUser } from '@/entities/user/types/user.interface'
import { useLogoutMutation } from '@/feautures/auth/model/mutations/useLogout.mutation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { LuLogOut } from 'react-icons/lu'

interface UserButtonProps {
	user: IUser
}

export function UserButton({ user }: UserButtonProps) {
	const router: AppRouterInstance = useRouter()
	const t = useTranslations()

	const { logout, isLoadingLogout } = useLogoutMutation(() =>
		router.push(APP_ROUTES.AUTH.LOGIN)
	)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user.picture} />
					<AvatarFallback>
						{user.displayName.slice(0, 1)}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-40' align='end'>
				<DropdownMenuItem
					disabled={isLoadingLogout}
					onClick={() => logout()}
				>
					<LuLogOut className='mr-2 size-4' />
					{t('logout')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export function UserButtonLoading() {
	return <Skeleton className='h-10 w-10 rounded-full' />
}
