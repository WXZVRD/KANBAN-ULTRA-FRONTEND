'use client'

import { useTranslations } from 'next-intl'
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
import { useProfileHook } from '@/shared/hooks'

import { useUpdateProfileMutation } from '@/feautures/profile/model/useUpdateProfileMutation'
import { SettingsScheme, TypeSettingsScheme } from '@/feautures/user/schemes'
import { UserButton, UserButtonLoading } from '@/feautures/user/ui/userButton'
import { zodResolver } from '@hookform/resolvers/zod'

export function SettingsForm() {
	const { user, isLoading } = useProfileHook()
	const { update, isLoadingUpdate } = useUpdateProfileMutation()

	const t = useTranslations()

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
				<CardTitle> {t('Settings.title')} </CardTitle>
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
										<FormLabel>{t('User.name')}</FormLabel>
										<FormControl>
											<Input
												placeholder={t('User.name')}
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
										<FormLabel>{t('User.email')}</FormLabel>
										<FormControl>
											<Input
												placeholder={t('User.email')}
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
												{t('User.twoFactorAuth')}
											</FormLabel>
											<FormDescription>
												{t(
													'User.twoFactorAuthDescription'
												)}
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
								{t('Actions.save')}
							</Button>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	)
}
