'use client'

import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/components/ui'

import { AuthWrapper } from '@/feautures/auth/components/AuthWrapper'
import { LoginScheme, TypeLoginScheme } from '@/feautures/auth/schemes/login.scheme'
import { zodResolver } from '@hookform/resolvers/zod'

export function LoginForm() {
	const [recaptcha, setRecaptcha] = useState<string | null>(null)
	const { theme } = useTheme()

	const form = useForm<TypeLoginScheme>({
		resolver: zodResolver(LoginScheme),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = (values: TypeLoginScheme) => {
		if (recaptcha) {
			console.log(values)
			toast.success('Успешный вход!')
		} else {
			toast.error('Пожалуйста, завершите ReCAPTHA')
			throw new Error('ReCAPTCHA флаг должен быть установлен')
		}
	}

	return (
		<AuthWrapper
			heading='Войти'
			description='Чтобы войти в аккаунт введите ваш email и пароль'
			backButtonLabel='Еще нет аккаунта? Регистрация'
			backButtonHref='/auth/register'
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-4'
				>
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
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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

					<Button type='submit'>Войти</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
