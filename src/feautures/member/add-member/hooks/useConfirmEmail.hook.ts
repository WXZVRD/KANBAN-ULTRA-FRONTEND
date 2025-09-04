'use client'

import { useEffect } from 'react'

import { MemberRole } from '@/entities/member'
import { useConfirmInviteMutation } from '@/feautures/member'
import { useParams, useSearchParams } from 'next/navigation'

export function useConfirmEmail() {
	const searchParams = useSearchParams()
	const { projectId } = useParams<{ projectId: string }>()
	const { confirmInvitation } = useConfirmInviteMutation(projectId)

	useEffect(() => {
		const token = searchParams.get('token')
		const role = searchParams.get('role') as MemberRole | null
		if (token && role && projectId) {
			confirmInvitation({
				memberRole: role,
				projectId,
				token
			})
		}
	}, [confirmInvitation, searchParams, projectId])
}
