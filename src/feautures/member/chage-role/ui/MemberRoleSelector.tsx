'use client'

import { useState } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui'

import { MemberRole } from '@/entities/member'

interface IMemberRoleSelector {
	value: MemberRole
	onChangeRole: (role: MemberRole) => void
}

export function MemberRoleSelector({
	value,
	onChangeRole
}: IMemberRoleSelector) {
	const [role, setRole] = useState<MemberRole>(value)

	return (
		<Select
			value={role}
			onValueChange={role => {
				setRole(role as MemberRole)
				onChangeRole(role as MemberRole)
			}}
		>
			<SelectTrigger className='w-[240px]'>
				<SelectValue placeholder='Select member role' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={MemberRole.ADMIN}>
					{MemberRole.ADMIN}
				</SelectItem>
				<SelectItem value={MemberRole.MEMBER}>
					{MemberRole.MEMBER}
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
