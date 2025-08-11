import { Metadata } from 'next'

import { NewVerificationForm } from '@/feautures/auth/components/NewVerificationForm'

const metadata: Metadata = {
	title: 'Верификация'
}

export default function NewVerificationPage() {
	return <NewVerificationForm />
}
