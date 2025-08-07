import { z } from 'zod'

export const LoginScheme = z.object({
	email: z.string().email({
		message: 'Некорректная почта'
	}),
	password: z.string().min(6, {
		message: 'Введите пароль, минимальная длина 6 символов'
	})
})

export type TypeLoginScheme = z.infer<typeof LoginScheme>
