'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/components/ui'
import { APP_ROUTES } from '@/shared/consts'

import { AuthWrapper, ResetPasswordScheme, TypeResetPasswordScheme, useResetPasswordMutation } from '@/feautures/auth'
import { zodResolver } from '@hookform/resolvers/zod'

export function ResetPasswordForm() {
	const [recaptcha, setRecaptcha] = useState<string | null>(null)
	const { theme } = useTheme()
	const t = useTranslations('Auth')

	const form = useForm<TypeResetPasswordScheme>({
		resolver: zodResolver(ResetPasswordScheme),
		defaultValues: {
			email: ''
		}
	})

	const { reset, isLoadingReset } = useResetPasswordMutation()

	const onSubmit = (values: TypeResetPasswordScheme): void => {
		if (recaptcha) {
			reset({ values, recaptcha })
		} else {
			toast.error(t('recaptchaError'))
			throw new Error('ReCAPTCHA флаг должен быть установлен')
		}
	}

	return (
		<AuthWrapper
			heading={t('passwordReset.title')}
			description={t('passwordReset.description')}
			backButtonLabel={t('passwordReset.backButtonTitle')}
			backButtonHref={APP_ROUTES.AUTH.LOGIN}
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
								<FormLabel>
									{t('passwordReset.email')}
								</FormLabel>
								<FormControl>
									<Input
										placeholder={t('passwordReset.email')}
										type='email'
										disabled={isLoadingReset}
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

					<Button disabled={isLoadingReset} type='submit'>
						{t('passwordReset.title')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
