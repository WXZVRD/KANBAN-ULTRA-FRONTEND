'use client'

import { useTranslations } from 'next-intl'
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

import { AuthWrapper } from '../../../auth/ui'
import { ProjectAccessType } from '@/entities/project/types/ProjectAcess.enum'
import { useUpdateProject } from '@/feautures/project/edit-project/model/useEditProject'
import { EditProjectScheme, TypeEditProjectScheme } from '@/feautures/project/edit-project/schemes/EditProject.scheme'
import { useGetById } from '@/feautures/project/hooks/useGetById'
import { zodResolver } from '@hookform/resolvers/zod'

export function EditProjectForm({ projectId }: { projectId: string }) {
	const { editProjectMutation, isEditProjectLoading } = useUpdateProject()
	const { currentProject, isProjectLoading } = useGetById(projectId)

	const t = useTranslations()

	const form = useForm<TypeEditProjectScheme>({
		resolver: zodResolver(EditProjectScheme),
		values: {
			title: currentProject?.title || '',
			accessType: currentProject?.accessType || ProjectAccessType.Public
		}
	})

	const onSubmit = (values: TypeEditProjectScheme): void => {
		editProjectMutation({ projectId, body: values })
	}

	return (
		<AuthWrapper
			heading={t('EditProjectPage.title')}
			description={t('EditProjectPage.description')}
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
									<FormLabel>
										{t('EditProjectPage.projectName')}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={t(
												'EditProjectPage.projectName'
											)}
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
									<FormLabel>
										{t('EditProjectPage.access')}
									</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<SelectTrigger className='w-[240px]'>
												<SelectValue
													placeholder={t(
														'EditProjectPage.accessDescription'
													)}
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectItem
													value={
														ProjectAccessType.Public
													}
												>
													{t(
														`Access.${ProjectAccessType.Public}`
													)}
												</SelectItem>
												<SelectItem
													value={
														ProjectAccessType.Private
													}
												>
													{t(
														`Access.${ProjectAccessType.Private}`
													)}
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button disabled={isEditProjectLoading} type='submit'>
							{t(`Actions.edit`)}
						</Button>
					</form>
				</Form>
			)}
		</AuthWrapper>
	)
}
