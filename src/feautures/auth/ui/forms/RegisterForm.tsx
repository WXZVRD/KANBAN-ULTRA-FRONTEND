'use client'

import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/components/ui'
import { APP_ROUTES } from '@/shared/consts'

import { useRegisterMutation } from '@/feautures/auth/hooks'
import { RegisterScheme, TypeRegisterScheme } from '@/feautures/auth/schemes'
import { AuthWrapper } from '@/feautures/auth/ui/common/AuthWrapper'
import { zodResolver } from '@hookform/resolvers/zod'

export function RegisterForm() {
	const [recaptcha, setRecaptcha] = useState<string | null>(null)
	const { theme } = useTheme()

	const form = useForm<TypeRegisterScheme>({
		resolver: zodResolver(RegisterScheme),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})

	const { register, isLoadingRegister } = useRegisterMutation()

	const onSubmit = (values: TypeRegisterScheme) => {
		if (recaptcha) {
			register({ values, recaptcha })
		} else {
			toast.error('Пожалуйста, завершите ReCAPTHA')
			throw new Error('ReCAPTCHA флаг должен быть установлен')
		}
	}

	return (
		<AuthWrapper
			heading='Регистрация'
			description='Чтобы войти в аккаунт введите ваш email и пароль'
			backButtonLabel='Уже есть аккаунт? Войти'
			backButtonHref={APP_ROUTES.AUTH.LOGIN}
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-4'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input
										placeholder='Имя'
										type='text'
										disabled={isLoadingRegister}
										{...field}
									/>
								</FormControl>
								<FormMessage />
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
										disabled={isLoadingRegister}
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
										disabled={isLoadingRegister}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='passwordRepeat'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Повторите пароль</FormLabel>
								<FormControl>
									<Input
										placeholder='Повторите пароль'
										type='password'
										disabled={isLoadingRegister}
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

					<Button disabled={isLoadingRegister} type='submit'>
						Подтвердить
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
