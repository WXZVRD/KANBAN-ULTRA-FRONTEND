'use client'

import { useForm } from 'react-hook-form'

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	Input,
	Switch
} from '@/shared/components/ui'
import { useProfile } from '@/shared/hooks'

import { UserButton, UserButtonLoading } from '@/feautures/user/components/userButton'
import { useUpdateProfileMutation } from '@/feautures/user/hooks/useUpdateProfileMutation'
import { SettingsScheme, TypeSettingsScheme } from '@/feautures/user/schemes'
import { zodResolver } from '@hookform/resolvers/zod'

export function SettingsForm() {
	const { user, isLoading } = useProfile()
	const { update, isLoadingUpdate } = useUpdateProfileMutation()

	const form = useForm<TypeSettingsScheme>({
		resolver: zodResolver(SettingsScheme),
		values: {
			email: user?.email || '',
			displayName: user?.displayName || '',
			isTwoFactorEnabled: user?.isTwoFactorEnabled || false
		}
	})

	const onSubmit = (values: TypeSettingsScheme) => {
		update(values)
	}

	if (!user) return null

	return (
		<Card className='w-[400px]'>
			<CardHeader className='flex flex-row items-center justify-between'>
				<CardTitle> Настройки профиля </CardTitle>
				{isLoading ? <UserButtonLoading /> : <UserButton user={user} />}
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<UserButtonLoading />
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid gap-2 space-y-2'
						>
							<FormField
								control={form.control}
								name='displayName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Имя</FormLabel>
										<FormControl>
											<Input
												placeholder='Имя'
												type='text'
												disabled={isLoadingUpdate}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Почта</FormLabel>
										<FormControl>
											<Input
												placeholder='Почта'
												type='email'
												disabled={isLoadingUpdate}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='isTwoFactorEnabled'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
										<div className='space-y-0.5'>
											<FormLabel>
												Двухфакторная аутентификация
											</FormLabel>
											<FormDescription>
												Включите двухфакторную
												аутентификацию для вашей учетной
												записи
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button disabled={isLoadingUpdate} type='submit'>
								Сохранить
							</Button>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	)
}
