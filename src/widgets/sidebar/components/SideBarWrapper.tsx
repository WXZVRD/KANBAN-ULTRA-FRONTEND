'use client'

import { useAuth } from '@/feautures/auth/hooks/useAuth'

export function SideBarWrapper() {
	const { user } = useAuth()

	console.log(user)
	if (!user) return null

	return (
		<div className='h-screen w-full max-w-[400px] border-r border-gray-300 bg-gray-50 p-4 shadow-sm'>
			sidebar
		</div>
	)
}
