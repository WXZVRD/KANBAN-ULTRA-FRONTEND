'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/components/ui'
import { APP_ROUTES } from '@/shared/consts'

import { AuthWrapper, RegisterScheme, TypeRegisterScheme, useRegisterMutation } from '@/feautures/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

export function RegisterForm() {
	const [recaptcha, setRecaptcha] = useState<string | null>(null)
	const { theme } = useTheme()
	const router: AppRouterInstance = useRouter()

	const t = useTranslations('Auth')

	const form = useForm<TypeRegisterScheme>({
		resolver: zodResolver(RegisterScheme),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})

	const { register, isLoadingRegister } = useRegisterMutation(() =>
		router.push(APP_ROUTES.AUTH.LOGIN)
	)

	const onSubmit = (values: TypeRegisterScheme) => {
		if (recaptcha) {
			register({ values, recaptcha })
		} else {
			toast.error(t('recaptchaError'))
			throw new Error('ReCAPTCHA флаг должен быть установлен')
		}
	}

	return (
		<AuthWrapper
			heading={t('register')}
			description={t('description')}
			backButtonLabel={t('haveAccount')}
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
								<FormLabel>{t('name')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('name')}
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
								<FormLabel>{t('email')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('email')}
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
								<FormLabel>{t('password')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('password')}
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
								<FormLabel>{t('repeatPassword')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('repeatPassword')}
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
						{t('submit')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
