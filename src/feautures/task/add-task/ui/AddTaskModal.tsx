'use client'

import { useState } from 'react'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'

interface ITaskModal {
	columnId: string
}

export function TaskModal({ columnId }: ITaskModal) {
	const [open, setOpen] = useState(false)

	const params = useParams<{ projectId: string }>()
	const projectId = params.projectId

	const form = useForm<TypeCreateTaskScheme>({
		resolver: zodResolver(createTaskScheme),
		defaultValues: {
			title: '',
			priority: TaskPriority.MEDIUM,
			assigneeId: undefined
		}
	})

	const { createTask } = useAddTaskMutation()

	const onSubmit = (values: TypeCreateTaskScheme) => {
		setOpen(false)
		form.reset()
		console.log(values)
		createTask({
			projectId: projectId,
			title: values.title,
			priority: values.priority,
			assigneeId: values.assigneeId,
			columnId: columnId
		})
	}

	return (
		<>
			<Button className='mb-3 w-full' onClick={e => setOpen(true)}>
				Создать задачу
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Новая задача</DialogTitle>
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
											defaultValue={field.value}
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
								Создать
							</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	)
}
