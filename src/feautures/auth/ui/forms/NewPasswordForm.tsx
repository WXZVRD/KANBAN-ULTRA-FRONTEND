'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/components/ui'
import { APP_ROUTES } from '@/shared/consts'

import { useNewPasswordMutation } from '@/feautures/auth/model/mutations/useNewPassword.mutation'
import { NewPasswordScheme, TypeNewPasswordScheme } from '@/feautures/auth/schemes'
import { AuthWrapper } from '@/feautures/auth/ui/common/AuthWrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

function NewPasswordForm() {
	const [recaptcha, setRecaptcha] = useState<string | null>(null)
	const { theme } = useTheme()
	const router: AppRouterInstance = useRouter()
	const t = useTranslations('Auth.newPassword')

	const form = useForm<TypeNewPasswordScheme>({
		resolver: zodResolver(NewPasswordScheme),
		defaultValues: {
			password: ''
		}
	})

	const { newPasswordMutation, isNewLoading } = useNewPasswordMutation(() =>
		router.push(APP_ROUTES.DASHBOARD_SETTINGS)
	)

	const onSubmit = (values: TypeNewPasswordScheme) => {
		if (recaptcha) {
			newPasswordMutation({ values, recaptcha })
		} else {
			toast.error(t('recaptchaError'))
			throw new Error('ReCAPTCHA флаг должен быть установлен')
		}
	}

	return (
		<AuthWrapper
			heading={t('title')}
			description={t('description')}
			backButtonLabel={t('backButtonTitle')}
			backButtonHref={APP_ROUTES.AUTH.LOGIN}
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
								<FormLabel>{t('password')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('password')}
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
						{t('submit')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}

export default NewPasswordForm
