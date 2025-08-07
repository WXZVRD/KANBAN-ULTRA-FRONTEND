import { z } from 'zod'

export const NewPasswordScheme = z.object({
	password: z.string().min(6, {
		message: 'Введите пароль, минимальная длина 6 символов'
	})
})

export type TypeNewPasswordScheme = z.infer<typeof NewPasswordScheme>
