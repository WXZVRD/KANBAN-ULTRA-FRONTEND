import { z } from 'zod'

export enum AccessType {
	Public = 'public',
	Private = 'private'
}

export const CreateProjectScheme = z.object({
	title: z.string().min(1, {
		message: 'Дайте название проекту'
	}),
	accessType: z.enum(AccessType, {
		error: () => ({
			message: 'Тип доступа должен быть публичным или приватным'
		})
	})
})

export type TypeCreateProjectScheme = z.infer<typeof CreateProjectScheme>
