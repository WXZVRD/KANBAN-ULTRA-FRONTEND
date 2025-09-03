'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
	Button,
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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/shared/components/ui/dialog'

import { TaskPriority } from '@/entities/task/types/priority.enum'
import { ProjectMemberSelector } from '@/feautures/member/project-member-selector/ui/ProjectMemberSelector'
import { useAddTaskMutation } from '@/feautures/task/add-task/model/useAddTask.mutation'
import { createTaskScheme, TypeCreateTaskScheme } from '@/feautures/task/add-task/schemes/AddTask.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'

interface CreateTaskModalProps {
	columnId: string
}

export function CreateTaskModal({ columnId }: CreateTaskModalProps) {
	const params = useParams<{ projectId: string }>()
	const projectId = params.projectId
	const { createTaskMutation } = useAddTaskMutation()

	const [open, setOpen] = useState(false)

	const form = useForm<TypeCreateTaskScheme>({
		resolver: zodResolver(createTaskScheme),
		defaultValues: {
			title: '',
			priority: TaskPriority.MEDIUM,
			assigneeId: undefined
		}
	})

	const onSubmit = (values: TypeCreateTaskScheme) => {
		createTaskMutation({
			projectId,
			columnId,
			title: values.title,
			priority: values.priority,
			assigneeId: values.assigneeId
		})

		form.reset()
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size='sm' variant='ghost'>
					Создать задачу
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Новая задача</DialogTitle>
					<DialogDescription>Впишите новую задачу.</DialogDescription>
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
											{Object.values(TaskPriority).map(
												priority => (
													<SelectItem
														key={priority}
														value={priority}
													>
														{priority}
													</SelectItem>
												)
											)}
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
	)
}
