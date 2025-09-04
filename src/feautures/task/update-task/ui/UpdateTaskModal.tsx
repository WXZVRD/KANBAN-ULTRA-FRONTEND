'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

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

import { IUpdateTaskDTO } from '@/entities/task/api/dto/update-task.dto'
import { TaskPriority } from '@/entities/task/types/priority.enum'
import { ProjectMemberSelector } from '@/feautures/member/project-member-selector/ui/ProjectMemberSelector'
import { useUpdateTask } from '@/feautures/task/update-task/model/useUpdateTask'
import { TypeUpdateTaskScheme, updateTaskScheme } from '@/feautures/task/update-task/schemes/UpdateTask.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'

interface UpdateTaskModalProps {
	columnId: string
	initialValues: IUpdateTaskDTO
}

export function UpdateTaskModal({
	initialValues,
	columnId
}: UpdateTaskModalProps) {
	const params = useParams<{ projectId: string }>()
	const projectId = params.projectId

	const { updateTaskMutation } = useUpdateTask()

	const [open, setOpen] = useState(false)

	const t = useTranslations()

	const form = useForm<TypeUpdateTaskScheme>({
		resolver: zodResolver(updateTaskScheme),
		values: {
			title: initialValues.title || '',
			priority: initialValues.priority,
			assigneeId: initialValues.assigneeId || ''
		}
	})

	const onSubmit: SubmitHandler<TypeUpdateTaskScheme> = values => {
		updateTaskMutation({
			id: initialValues.id,
			projectId,
			columnId: columnId,
			title: values.title,
			priority: values.priority,
			assigneeId: values.assigneeId
		})
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className='p-0 text-sm font-normal'
					size='sm'
					variant='ghost'
				>
					{t('TaskUpdateModal.title')}
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('TaskUpdateModal.title')}</DialogTitle>
					<DialogDescription>
						{t('TaskUpdateModal.description')}
					</DialogDescription>
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
									<FormLabel>
										{t('TaskUpdateModal.name')}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={t(
												'TaskUpdateModal.nameDescription'
											)}
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
									<FormLabel>
										{t('TaskUpdateModal.assignee')}
									</FormLabel>
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
									<FormLabel>
										{t('TaskUpdateModal.priority')}
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													placeholder={t(
														'TaskUpdateModal.priorityDescription'
													)}
												/>
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
							{t('TaskUpdateModal.submit')}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
