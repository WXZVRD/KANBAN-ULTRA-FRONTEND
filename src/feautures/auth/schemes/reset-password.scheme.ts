import { z } from 'zod'

export const ResetPasswordScheme = z.object({
	email: z.string().email({
		message: 'Некорректная почта'
	})
})

export type TypeResetPasswordScheme = z.infer<typeof ResetPasswordScheme>
