import { z } from 'zod'

export const SettingsScheme = z.object({
	displayName: z.string().min(1, {
		message: 'Введите имя'
	}),
	email: z.string().email({
		message: 'Некорректная почта'
	}),
	isTwoFactorEnabled: z.boolean()
})

export type TypeSettingsScheme = z.infer<typeof SettingsScheme>
