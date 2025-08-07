import { z } from 'zod'

export const RegisterScheme = z
	.object({
		name: z.string().min(1, {
			message: 'Введите имя'
		}),
		email: z.string().email({
			message: 'Некорректная почта'
		}),
		password: z.string().min(6, {
			message: 'Введите пароль, минимальная длина 6 символов'
		}),
		passwordRepeat: z.string().min(6, {
			message: 'Повторите пароль, минимальная длина 6 символов'
		})
	})
	.refine(data => data.password === data.passwordRepeat, {
		message: 'Пароли не совпадают',
		path: ['passwordRepeat']
	})

export type TypeRegisterScheme = z.infer<typeof RegisterScheme>
