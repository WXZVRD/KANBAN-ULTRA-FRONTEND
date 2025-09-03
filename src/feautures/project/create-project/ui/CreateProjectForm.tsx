'use client'

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

import { AuthWrapper } from '../../../auth/ui'
import { ProjectAccessType } from '@/entities/project/types/ProjectAcess.enum'
import { useCreateProject } from '@/feautures/project/create-project/model/useCreateproject'
import {
	CreateProjectScheme,
	TypeCreateProjectScheme
} from '@/feautures/project/create-project/schemes/CreateProject.scheme'
import { zodResolver } from '@hookform/resolvers/zod'

export function CreateProjectForm() {
	const { createProjectMutation, isCreateProjectLoading } = useCreateProject()

	const form = useForm<TypeCreateProjectScheme>({
		resolver: zodResolver(CreateProjectScheme),
		defaultValues: {
			title: '',
			accessType: ProjectAccessType.Public
		}
	})

	const onSubmit = (values: TypeCreateProjectScheme) => {
		createProjectMutation(values)
	}

	return (
		<AuthWrapper
			heading='Создание проекта'
			description='Создайте свой проект и настройте его'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-4'
				>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input
										placeholder='Название'
										type='text'
										disabled={isCreateProjectLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='accessType'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Доступность</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger className='w-[240px]'>
											<SelectValue placeholder='Select access type' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem
												value={ProjectAccessType.Public}
											>
												{ProjectAccessType.Public}
											</SelectItem>
											<SelectItem
												value={
													ProjectAccessType.Private
												}
											>
												{ProjectAccessType.Private}
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button disabled={isCreateProjectLoading} type='submit'>
						Создать
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
