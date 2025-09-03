import { z } from 'zod'

import { ProjectAccessType } from '@/entities/project/types/ProjectAcess.enum'

export const CreateProjectScheme = z.object({
	title: z.string().min(1, {
		message: 'Дайте название проекту'
	}),
	accessType: z.enum(ProjectAccessType, {
		error: () => ({
			message: 'Тип доступа должен быть публичным или приватным'
		})
	})
})

export type TypeCreateProjectScheme = z.infer<typeof CreateProjectScheme>
