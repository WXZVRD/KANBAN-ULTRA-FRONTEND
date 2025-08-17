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
	Loader,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui'

import { AuthWrapper } from '@/feautures/auth/components'
import { useUpdateProject } from '@/feautures/project/hooks/useEditProject'
import { useGetById } from '@/feautures/project/hooks/useGetById'
import { AccessType } from '@/feautures/project/schemes/CreateProject.scheme'
import { EditProjectScheme, TypeEditProjectScheme } from '@/feautures/project/schemes/EditProject.scheme'
import { zodResolver } from '@hookform/resolvers/zod'

export function EditProjectForm({ projectId }: { projectId: string }) {
	const { editProject, isEditProjectLoading } = useUpdateProject()
	const { currentProject, isProjectLoading } = useGetById(projectId)

	const form = useForm<TypeEditProjectScheme>({
		resolver: zodResolver(EditProjectScheme),
		values: {
			title: currentProject?.title || '',
			accessType: currentProject?.accessType || AccessType.Public
		}
	})

	const onSubmit = (values: TypeEditProjectScheme) => {
		editProject({ projectId, body: values })
	}

	return (
		<AuthWrapper
			heading='Редактирование проекта'
			description='Отредактируйте проект'
		>
			{isProjectLoading ? (
				<Loader />
			) : (
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
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input
											placeholder='Название'
											type='text'
											disabled={isEditProjectLoading}
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
											value={field.value}
										>
											<SelectTrigger className='w-[240px]'>
												<SelectValue placeholder='Выберите доступ' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem
													value={AccessType.Public}
												>
													{AccessType.Public}
												</SelectItem>
												<SelectItem
													value={AccessType.Private}
												>
													{AccessType.Private}
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button disabled={isEditProjectLoading} type='submit'>
							Изменить
						</Button>
					</form>
				</Form>
			)}
		</AuthWrapper>
	)
}
