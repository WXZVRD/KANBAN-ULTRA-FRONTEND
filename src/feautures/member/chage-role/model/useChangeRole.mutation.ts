import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { IMember } from '@/entities/member/types/member.interface'
import { ChangeRoleApi, IChangeRoleDTO } from '@/feautures/member/chage-role/api/chage-role.api'
import { useMutation } from '@tanstack/react-query'

export function useChangeRoleMutation() {
	const { mutate: changeRole } = useMutation({
		mutationKey: ['change-role'],
		mutationFn: async (data: IChangeRoleDTO): Promise<IMember> =>
			await ChangeRoleApi(data),
		onSuccess(): void {
			toast.success('Вы успешно изменили роль пользователя!')
		},
		onError(error: Error): void {
			toastMessageHandler(error)
		}
	})

	return { changeRole }
}
