'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/components/ui'
import { APP_ROUTES } from '@/shared/consts'

import { AuthWrapper, LoginScheme, TypeLoginScheme, useLoginMutation } from '@/feautures/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function LoginForm() {
	const [recaptcha, setRecaptcha] = useState<string | null>(null)
	const { theme } = useTheme()
	const [isShowTwoFactor, setIsShowTwoFactor] = useState<boolean>(false)

	const t = useTranslations('Auth')
	const router: AppRouterInstance = useRouter()

	const form = useForm<TypeLoginScheme>({
		resolver: zodResolver(LoginScheme),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { login, isLoadingLogin } = useLoginMutation(setIsShowTwoFactor, () =>
		router.push(APP_ROUTES.DASHBOARD_SETTINGS)
	)

	const onSubmit = (values: TypeLoginScheme): void => {
		if (recaptcha) {
			login({ values, recaptcha })
		} else {
			toast.error(t('recaptchaError'))
			throw new Error('ReCAPTCHA флаг должен быть установлен')
		}
	}

	return (
		<AuthWrapper
			heading={t('login')}
			description={t('description')}
			backButtonLabel={t('noAccount')}
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
									<FormLabel>{t('twoFactorCode')}</FormLabel>
									<FormControl>
										<Input
											disabled={isLoadingLogin}
											placeholder='667788'
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
										<FormLabel>{t('email')}</FormLabel>
										<FormControl>
											<Input
												disabled={isLoadingLogin}
												placeholder='jhon@gmail.com'
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
											<FormLabel>
												{t('password')}
											</FormLabel>
											<Link
												href={
													APP_ROUTES.AUTH
														.RESET_PASSWORD
												}
												className='ml-auto inline-block text-sm underline'
											>
												{t('forgotPassword')}
											</Link>
										</div>
										<FormControl>
											<Input
												disabled={isLoadingLogin}
												placeholder={t('password')}
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
						{t('login')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
