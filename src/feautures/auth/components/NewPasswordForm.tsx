'use client'

import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/components/ui'

import { AuthWrapper } from '@/feautures/auth/components/AuthWrapper'
import { useNewPasswordMutation } from '@/feautures/auth/hooks/useNewPasswordMutation'
import { NewPasswordScheme, TypeNewPasswordScheme } from '@/feautures/auth/schemes'
import { zodResolver } from '@hookform/resolvers/zod'

function NewPasswordForm() {
	const [recaptcha, setRecaptcha] = useState<string | null>(null)
	const { theme } = useTheme()

	const form = useForm<TypeNewPasswordScheme>({
		resolver: zodResolver(NewPasswordScheme),
		defaultValues: {
			password: ''
		}
	})

	const { newPassword, isNewLoading } = useNewPasswordMutation()

	const onSubmit = (values: TypeNewPasswordScheme) => {
		if (recaptcha) {
			newPassword({ values, recaptcha })
		} else {
			toast.error('Пожалуйста, завершите ReCAPTHA')
			throw new Error('ReCAPTCHA флаг должен быть установлен')
		}
	}

	return (
		<AuthWrapper
			heading='Новый пароль'
			description='Придумайте новый пароль для вашего аккаунта'
			backButtonLabel='Войти в аккаунт'
			backButtonHref='/auth/login'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-4'
				>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input
										placeholder='Пароль'
										type='password'
										disabled={isNewLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex justify-center'>
						<ReCAPTCHA
							sitekey={
								process.env
									.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string
							}
							onChange={setRecaptcha}
							theme={theme === 'light' ? 'light' : 'dark'}
						/>
					</div>

					<Button disabled={isNewLoading} type='submit'>
						Подтвердить
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}

export default NewPasswordForm
