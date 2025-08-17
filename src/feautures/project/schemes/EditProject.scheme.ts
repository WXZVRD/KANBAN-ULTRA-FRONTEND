import { z } from 'zod'

import { AccessType } from '@/feautures/project/schemes/CreateProject.scheme'

export const EditProjectScheme = z.object({
	title: z.string().min(1, {
		message: 'Дайте название проекту'
	}),
	accessType: z.enum(AccessType, {
		error: () => ({
			message: 'Тип доступа должен быть публичным или приватным'
		})
	})
})

export type TypeEditProjectScheme = z.infer<typeof EditProjectScheme>
