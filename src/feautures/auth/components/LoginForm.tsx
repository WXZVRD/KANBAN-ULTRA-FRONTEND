'use client'

import { useForm } from 'react-hook-form'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/components/ui'

import { AuthWrapper } from '@/feautures/auth/components/AuthWrapper'
import { LoginScheme, TypeLoginScheme } from '@/feautures/auth/schemes/login.scheme'
import { zodResolver } from '@hookform/resolvers/zod'

export function LoginForm() {
	const form = useForm<TypeLoginScheme>({
		resolver: zodResolver(LoginScheme),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = (values: TypeLoginScheme) => {
		console.log(values)
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

					<Button type='submit'>Войти</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
