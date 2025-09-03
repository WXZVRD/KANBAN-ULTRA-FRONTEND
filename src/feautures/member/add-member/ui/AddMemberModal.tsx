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
					Добавить участника
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Добавить нового участника в проект
					</DialogTitle>
					<DialogDescription>
						Введите почту пользователя для его приглашения.
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
									<FormLabel>Почта</FormLabel>
									<FormControl>
										<Input
											placeholder='jhon@gmail.com'
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
									<FormLabel>Роль</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<SelectTrigger className='w-[240px]'>
												<SelectValue placeholder='Select member role' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem
													value={MemberRole.ADMIN}
												>
													{MemberRole.ADMIN}
												</SelectItem>
												<SelectItem
													value={MemberRole.MEMBER}
												>
													{MemberRole.MEMBER}
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
							Пригласить
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
