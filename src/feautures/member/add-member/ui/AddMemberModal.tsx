'use client'

import { useTranslations } from 'next-intl'
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

import { MemberRole } from '@/entities/member/types/member-role.enum'
import { useAddMember } from '@/feautures/member/add-member/model/useAddMember.mutation'
import { addMemberScheme, TypeAddMemberScheme } from '@/feautures/member/add-member/schemes/add-member.scheme'
import { zodResolver } from '@hookform/resolvers/zod'

interface AddMemberModalProps {
	projectId: string
}

export function AddMemberModal({ projectId }: AddMemberModalProps) {
	const [open, setOpen] = useState(false)

	const { addMemberMutation } = useAddMember()

	const t = useTranslations()

	const form = useForm<TypeAddMemberScheme>({
		resolver: zodResolver(addMemberScheme),
		defaultValues: {
			email: '',
			memberRole: MemberRole.MEMBER
		}
	})

	const onSubmit = (values: TypeAddMemberScheme) => {
		addMemberMutation({
			projectId,
			memberRole: values.memberRole,
			email: values.email
		})

		form.reset()
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
					{t('AddMemberModal.trigger')}
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('AddMemberModal.title')}</DialogTitle>
					<DialogDescription>
						{t('AddMemberModal.description')}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'
					>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t('AddMemberModal.email')}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={t(
												'AddMemberModal.emailPlaceholder'
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
							name='memberRole'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t('AddMemberModal.role')}
									</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<SelectTrigger className='w-[240px]'>
												<SelectValue
													placeholder={t(
														'AddMemberModal.rolePlaceholder'
													)}
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectItem
													value={MemberRole.ADMIN}
												>
													{t(
														`Member.${MemberRole.ADMIN}`
													)}
												</SelectItem>
												<SelectItem
													value={MemberRole.MEMBER}
												>
													{t(
														`Member.${MemberRole.MEMBER}`
													)}
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							onClick={() => onSubmit(form.getValues())}
							type='submit'
							className='w-full'
						>
							{t('Actions.invite')}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
