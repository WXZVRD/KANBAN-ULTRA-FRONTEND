import { type Metadata } from 'next'

import { SettingsForm } from '../../../../feautures/user/ui'

export const metadata: Metadata = {
	title: 'Настройки профиля'
}

export default function SettingsPage() {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<SettingsForm />
		</div>
	)
}
