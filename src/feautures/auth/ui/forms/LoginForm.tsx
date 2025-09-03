'use client'

import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/components/ui'
import { APP_ROUTES } from '@/shared/consts'

import { useLoginMutation } from '@/feautures/auth/model/mutations/useLogin.mutation'
import { LoginScheme, TypeLoginScheme } from '@/feautures/auth/schemes/login.scheme'
import { AuthWrapper } from '@/feautures/auth/ui/common/AuthWrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

export function LoginForm() {
	const [recaptcha, setRecaptcha] = useState<string | null>(null)
	const { theme } = useTheme()
	const [isShowTwoFactor, setIsShowTwoFactor] = useState(false)

	const form = useForm<TypeLoginScheme>({
		resolver: zodResolver(LoginScheme),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { login, isLoadingLogin } = useLoginMutation(setIsShowTwoFactor)

	const onSubmit = (values: TypeLoginScheme) => {
		console.log(isShowTwoFactor)
		if (recaptcha) {
			login({ values, recaptcha })
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
			backButtonHref={APP_ROUTES.AUTH.REGISTER}
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-4'
				>
					{isShowTwoFactor && (
						<FormField
							control={form.control}
							name='code'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Код</FormLabel>
									<FormControl>
										<Input
											disabled={isLoadingLogin}
											placeholder='123456'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					{!isShowTwoFactor && (
						<>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Почта</FormLabel>
										<FormControl>
											<Input
												disabled={isLoadingLogin}
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
										<div className='item-center flex justify-between'>
											<FormLabel>Пароль</FormLabel>
											<Link
												href={
													APP_ROUTES.AUTH
														.RESET_PASSWORD
												}
												className='ml-auto inline-block text-sm underline'
											>
												Забыли пароль?
											</Link>
										</div>
										<FormControl>
											<Input
												disabled={isLoadingLogin}
												placeholder='Пароль'
												type='password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}

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

					<Button disabled={isLoadingLogin} type='submit'>
						Войти
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
