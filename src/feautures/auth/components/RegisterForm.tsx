import { AuthWrapper } from '@/feautures/auth/components/AuthWrapper'

export function RegisterForm() {
	return (
		<AuthWrapper
			heading='Регистрация'
			description='Чтобы войти в аккаунт введите ваш email и пароль'
			backButtonLabel='Уже есть аккаунт? Войти'
			backButtonHref='/auth/social'
			isShowSocial
		>
			RegisterForm
		</AuthWrapper>
	)
}
