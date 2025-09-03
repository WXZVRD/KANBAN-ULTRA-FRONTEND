import { z } from 'zod'

import { TaskPriority } from '@/entities/task/types/priority.enum'

export const updateTaskScheme = z.object({
	title: z.string().min(1, 'Введите название задачи'),
	assigneeId: z
		.string()
		.uuid('Некорректный ID исполнителя')
		.optional()
		.or(z.literal('')),
	priority: z.nativeEnum(TaskPriority).optional()
})

export type TypeUpdateTaskScheme = z.infer<typeof updateTaskScheme>
