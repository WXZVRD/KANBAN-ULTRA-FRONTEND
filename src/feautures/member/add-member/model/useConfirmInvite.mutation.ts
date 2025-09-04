'use client'

import { toast } from 'sonner'

import { APP_ROUTES } from '@/shared/consts'
import { toastMessageHandler } from '@/shared/utils'

import { confirmInvite, IConfirmInviteDTO } from '@/feautures/member'
import { useMutation } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

export function useConfirmInviteMutation(projectId: string) {
	const router: AppRouterInstance = useRouter()

	const { mutate: confirmInvitation } = useMutation({
		mutationKey: ['take-invite'],
		mutationFn: async (data: IConfirmInviteDTO): Promise<void> =>
			await confirmInvite(data),
		onSuccess(): void {
			toast.success('Вы стали участником нового проекта!')
			router.replace(APP_ROUTES.PROJECTS.CURRENT(projectId))
		},
		onError(error): void {
			toastMessageHandler(error)
		}
	})

	return { confirmInvitation }
}
