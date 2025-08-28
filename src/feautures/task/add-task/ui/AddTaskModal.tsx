'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui'

import { TaskPriority } from '@/entities/task/types/priority.enum'
import { ProjectMemberSelector } from '@/feautures/member/project-member-selector/ui/ProjectMemberSelector'
import { createTaskScheme, TypeCreateTaskScheme } from '@/feautures/task/add-task/model/AddTask.scheme'
import { useAddTaskMutation } from '@/feautures/task/add-task/model/useAddTask.mutation'
import { IUpdateTaskDTO } from '@/feautures/task/update-task/api/update-task.api'
import { useUpdateTask } from '@/feautures/task/update-task/model/useUpdateTask'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'

interface ITaskModal {
	columnId: string
	initialValues?: IUpdateTaskDTO
}

export function TaskModal({ columnId, initialValues }: ITaskModal) {
	const [open, setOpen] = useState(false)

	const params = useParams<{ projectId: string }>()
	const projectId = params.projectId

	const isEditMode = !!initialValues

	const form = useForm<TypeCreateTaskScheme>({
		resolver: zodResolver(createTaskScheme),
		defaultValues: isEditMode
			? {
					title: initialValues.title,
					priority: initialValues.priority,
					assigneeId: initialValues.assigneeId
				}
			: {
					title: '',
					priority: TaskPriority.MEDIUM,
					assigneeId: undefined
				}
	})

	useEffect(() => {
		if (isEditMode) {
			form.reset({
				title: initialValues.title,
				priority: initialValues.priority,
				assigneeId: initialValues.assigneeId
			})
		}
	}, [isEditMode, initialValues, form])

	const { createTask } = useAddTaskMutation()
	const { updateTask } = useUpdateTask()

	const onSubmit = (values: TypeCreateTaskScheme) => {
		if (!isEditMode) {
			createTask({
				projectId,
				title: values.title,
				priority: values.priority,
				assigneeId: values.assigneeId,
				columnId
			})
		} else {
			updateTask({
				columnId,
				projectId,
				title: values.title,
				priority: values.priority,
				assigneeId: values.assigneeId,
				id: initialValues.id
			})
		}

		setOpen(false)
		form.reset()
	}

	return (
		<>
			<Button className='mb-3 w-full' onClick={() => setOpen(true)}>
				{isEditMode ? 'Редактировать' : 'Создать задачу'}
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{isEditMode
								? 'Редактировать задачу'
								: 'Новая задача'}
						</DialogTitle>
					</DialogHeader>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4'
						>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Название</FormLabel>
										<FormControl>
											<Input
												placeholder='Например: Купить хлеб'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='assigneeId'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Исполнитель</FormLabel>
										<FormControl>
											<ProjectMemberSelector
												projectId={projectId}
												value={field.value}
												onChange={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='priority'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Приоритет</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Выберите приоритет' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(
													TaskPriority
												).map(priority => (
													<SelectItem
														key={priority}
														value={priority}
													>
														{priority}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type='submit' className='w-full'>
								{isEditMode ? 'Сохранить изменения' : 'Создать'}
							</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	)
}
