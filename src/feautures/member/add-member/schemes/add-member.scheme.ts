import { z } from 'zod'

import { MemberRole } from '@/entities/member/types/member-role.enum'

export const addMemberScheme = z.object({
	email: z.string().email({
		message: 'Некорректная почта'
	}),
	memberRole: z.enum(MemberRole, {
		error: () => ({
			message: 'Выберите роль участника'
		})
	})
})

export type TypeAddMemberScheme = z.infer<typeof addMemberScheme>
