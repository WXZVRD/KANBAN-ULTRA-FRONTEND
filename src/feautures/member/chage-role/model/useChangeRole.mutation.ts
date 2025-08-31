import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { ChangeRoleApi, IChangeRoleDTO } from '@/feautures/member/chage-role/api/chage-role.api'
import { useMutation } from '@tanstack/react-query'

export function useChangeRoleMutation() {
	const { mutate: changeRole } = useMutation({
		mutationKey: ['change-role'],
		mutationFn: async (data: IChangeRoleDTO) => await ChangeRoleApi(data),
		onSuccess() {
			toast.success('Вы успешно изменили роль пользователя!')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { changeRole }
}
