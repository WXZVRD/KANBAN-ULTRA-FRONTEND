'use client'

import { useEffect } from 'react'

import { MemberRole } from '@/entities/member/types/member-role.enum'
import { useConfirmInviteMutation } from '@/feautures/member/add-member/model/useConfirmInvite.mutation'
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
	}, [searchParams, projectId])
}
